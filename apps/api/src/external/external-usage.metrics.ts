export type ProviderMetric = { provider: string; calls: number; failures: number; totalLatencyMs: number };
export class ExternalUsageMetrics {
  private readonly values = new Map<string, ProviderMetric>();
  record(provider: string, latencyMs: number, failed: boolean) { const current = this.values.get(provider) ?? { provider, calls: 0, failures: 0, totalLatencyMs: 0 }; current.calls += 1; current.failures += Number(failed); current.totalLatencyMs += latencyMs; this.values.set(provider, current); }
  summary() { return [...this.values.values()].map(({ totalLatencyMs, ...metric }) => ({ ...metric, averageLatencyMs: Math.round(totalLatencyMs / metric.calls) })); }
  reset() { this.values.clear(); }
}
export const externalUsageMetrics = new ExternalUsageMetrics();
