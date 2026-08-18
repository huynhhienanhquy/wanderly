import { Injectable } from '@nestjs/common';
import type { ExtractConstraintsRequest, ExtractConstraintsResponse } from '@wanderly/contracts';
import { OpenAiConstraintsProvider } from './openai-constraints.provider';

@Injectable()
export class ConstraintExtractionService {
  constructor(private readonly provider: OpenAiConstraintsProvider) {}

  async extract(request: ExtractConstraintsRequest): Promise<ExtractConstraintsResponse> {
    try {
      return await this.provider.extract(request);
    } catch {
      const people = request.input.match(/(\d+)\s*(?:người|nguoi)/i);
      const budget = request.input.match(/(\d+(?:[.,]\d+)?)\s*(triệu|trieu|k|nghìn|nghin)/i);
      const amount = budget ? Number(budget[1]!.replace(',', '.')) * (/triệu|trieu/i.test(budget[2]!) ? 1_000_000 : 1_000) : null;
      return {
        constraints: { peopleCount: people ? Number(people[1]) : 1, budget: amount, currency: 'VND', interests: [], excludedCategories: [], travelMode: 'DRIVE', notes: request.input, ...(request.currentLocation ? { startLocation: request.currentLocation } : {}) },
        missingFields: [...(!people ? ['peopleCount'] : []), ...(!budget ? ['budget'] : [])],
        warnings: ['AI provider tạm thời không khả dụng; kết quả được trích xuất bằng fallback cục bộ.'],
      };
    }
  }
}
