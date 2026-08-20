/** Stable boundary implemented by external services so callers can switch providers through DI. */
export interface ExternalProviderAdapter<Input, Output> {
  readonly name: string;
  execute(input: Input): Promise<Output>;
}
