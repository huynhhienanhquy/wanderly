import { Injectable } from '@nestjs/common'; import { PrismaService } from '../database/prisma.service';
const COST_PER_MILLION: Record<string, { input: number; output: number }> = { 'gpt-4.1-mini': { input: 0.4, output: 1.6 }, 'gpt-4.1': { input: 2, output: 8 } };
@Injectable()
export class AdminAiUsageService {
  constructor(private readonly prisma: PrismaService) {}
  async summary(days = 30) {
    const since = new Date(); since.setUTCDate(since.getUTCDate() - Math.max(1, Math.min(90, days)));
    const rows = await this.prisma.aiInteraction.findMany({ where: { createdAt: { gte: since } }, orderBy: { createdAt: 'desc' }, take: 10_000, select: { provider: true, model: true, status: true, latencyMs: true, inputTokens: true, outputTokens: true } });
    const groups = new Map<string, { provider: string; model: string; requests: number; failures: number; latency: number; inputTokens: number; outputTokens: number; estimatedCostUsd: number }>();
    for (const row of rows) { const key = `${row.provider}:${row.model}`; const group = groups.get(key) ?? { provider: row.provider, model: row.model, requests: 0, failures: 0, latency: 0, inputTokens: 0, outputTokens: 0, estimatedCostUsd: 0 }; group.requests += 1; group.failures += Number(row.status === 'FAILED'); group.latency += row.latencyMs; group.inputTokens += row.inputTokens ?? 0; group.outputTokens += row.outputTokens ?? 0; const price = COST_PER_MILLION[row.model]; if (price) group.estimatedCostUsd += ((row.inputTokens ?? 0) * price.input + (row.outputTokens ?? 0) * price.output) / 1_000_000; groups.set(key, group); }
    return [...groups.values()].map(({ latency, ...group }) => ({ ...group, averageLatencyMs: Math.round(latency / group.requests), estimatedCostUsd: Math.round(group.estimatedCostUsd * 1_000_000) / 1_000_000 }));
  }
}
