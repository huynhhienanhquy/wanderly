import { Injectable } from '@nestjs/common';
import type { ExtractConstraintsRequest, ExtractConstraintsResponse } from '@wanderly/contracts';
import { OpenAiConstraintsProvider } from './openai-constraints.provider';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ConstraintExtractionService {
  constructor(private readonly provider: OpenAiConstraintsProvider, private readonly prisma: PrismaService) {}

  async extract(request: ExtractConstraintsRequest): Promise<ExtractConstraintsResponse> {
    const startedAt = Date.now();
    let usedFallback = false;
    let result: ExtractConstraintsResponse;
    try {
      result = await this.provider.extract(request);
    } catch {
      usedFallback = true;
      const people = request.input.match(/(\d+)\s*(?:người|nguoi)/i);
      const budget = request.input.match(/(\d+(?:[.,]\d+)?)\s*(triệu|trieu|k|nghìn|nghin)/i);
      const amount = budget ? Number(budget[1]!.replace(',', '.')) * (/triệu|trieu/i.test(budget[2]!) ? 1_000_000 : 1_000) : null;
      result = {
        constraints: { peopleCount: people ? Number(people[1]) : 1, budget: amount, currency: 'VND', interests: [], excludedCategories: [], travelMode: 'DRIVE', notes: request.input, ...(request.currentLocation ? { startLocation: request.currentLocation } : {}) },
        missingFields: [...(!people ? ['peopleCount'] : []), ...(!budget ? ['budget'] : [])],
        warnings: ['AI provider tạm thời không khả dụng; kết quả được trích xuất bằng fallback cục bộ.'],
      };
    }
    await this.prisma.aiInteraction.create({ data: {
      interactionType: 'EXTRACT', provider: usedFallback ? 'local' : 'openai',
      model: usedFallback ? 'deterministic-v1' : (process.env.OPENAI_MODEL ?? 'gpt-5.6-terra'), promptVersion: 'constraints-v1',
      inputRedacted: { length: request.input.length, timezone: request.timezone, hasLocation: Boolean(request.currentLocation) },
      outputJson: { peopleCount: result.constraints.peopleCount, budget: result.constraints.budget, currency: result.constraints.currency, interestCount: result.constraints.interests.length, missingFields: result.missingFields },
      latencyMs: Date.now() - startedAt, status: usedFallback ? 'FALLBACK' : 'SUCCESS',
    } }).catch(() => undefined);
    return result;
  }
}
