export class ExternalCallPolicy {
  private failures = 0;
  private openUntil = 0;
  constructor(private readonly timeoutMs = 8_000, private readonly retries = 1, private readonly failureThreshold = 3, private readonly cooldownMs = 30_000) {}
  async execute<T>(operation: (signal: AbortSignal) => Promise<T>): Promise<T> {
    if (Date.now() < this.openUntil) throw new Error('provider circuit is open');
    let lastError: unknown;
    for (let attempt = 0; attempt <= this.retries; attempt += 1) {
      try { const result = await operation(AbortSignal.timeout(this.timeoutMs)); this.failures = 0; return result; }
      catch (error) { lastError = error; }
    }
    this.failures += 1;
    if (this.failures >= this.failureThreshold) this.openUntil = Date.now() + this.cooldownMs;
    throw lastError;
  }
}
