import { externalUsageMetrics, type ExternalUsageMetrics } from './external-usage.metrics';
export class ExternalCallPolicy {
  private failures = 0;
  private openUntil = 0;
  constructor(private readonly timeoutMs = 8_000, private readonly retries = 1, private readonly failureThreshold = 3, private readonly cooldownMs = 30_000, private readonly provider = 'external', private readonly metrics: ExternalUsageMetrics = externalUsageMetrics) {}
  async execute<T>(operation: (signal: AbortSignal) => Promise<T>): Promise<T> {
    const startedAt = Date.now();
    if (Date.now() < this.openUntil) { this.metrics.record(this.provider, 0, true); throw new Error('provider circuit is open'); }
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      try { const result = await operation(AbortSignal.timeout(this.timeoutMs)); this.failures = 0; this.metrics.record(this.provider, Date.now() - startedAt, false); return result; }
      catch (error) { lastError = error; }
    }
    this.failures += 1;
    if (this.failures >= this.failureThreshold) this.openUntil = Date.now() + this.cooldownMs;
    this.metrics.record(this.provider, Date.now() - startedAt, true);
    throw lastError;
  }
}
