export const DEFAULT_OPENAI_MODEL = 'gpt-5.6-terra';
export const AI_PROVIDER_DECISION = { provider: 'openai', api: 'responses', structuredOutput: true, store: false, fallback: 'local' } as const;
export function aiProviderConfig(environment: NodeJS.ProcessEnv = process.env) {
  return { apiKey: environment.OPENAI_API_KEY?.trim() || null, model: environment.OPENAI_MODEL?.trim() || DEFAULT_OPENAI_MODEL };
}
