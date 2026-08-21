import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { extractConstraintsResponseSchema, type ExtractConstraintsRequest, type ExtractConstraintsResponse } from '@wanderly/contracts';
import { buildConstraintPrompt, CONSTRAINT_SYSTEM_PROMPT } from './constraint-prompt';
import { normalizeConstraints } from './constraint-normalizer';
import { aiProviderConfig } from './ai-provider.config';
import type { ExternalProviderAdapter } from '../external/provider-adapter';
import { ExternalCallPolicy } from '../external/external-call.policy';

const responseSchema = {
  type: 'object', additionalProperties: false, required: ['constraints', 'missingFields', 'warnings'],
  properties: {
    constraints: {
      type: 'object', additionalProperties: false,
      required: ['date', 'startTime', 'endTime', 'peopleCount', 'budget', 'currency', 'interests', 'excludedCategories', 'startLocation', 'maxTravelRadiusMeters', 'travelMode', 'notes'],
      properties: {
        date: { type: ['string', 'null'] }, startTime: { type: ['string', 'null'] }, endTime: { type: ['string', 'null'] },
        peopleCount: { type: ['integer', 'null'], minimum: 1 }, budget: { type: ['integer', 'null'], minimum: 0 },
        currency: { type: 'string' }, interests: { type: 'array', items: { type: 'string' } },
        excludedCategories: { type: 'array', items: { type: 'string' } },
        startLocation: { type: ['object', 'null'], additionalProperties: false, required: ['latitude', 'longitude', 'label'], properties: { latitude: { type: 'number' }, longitude: { type: 'number' }, label: { type: ['string', 'null'] } } },
        maxTravelRadiusMeters: { type: ['integer', 'null'] }, travelMode: { type: 'string', enum: ['WALK', 'BIKE', 'DRIVE', 'TRANSIT'] }, notes: { type: ['string', 'null'] },
      },
    },
    missingFields: { type: 'array', items: { type: 'string' } }, warnings: { type: 'array', items: { type: 'string' } },
  },
} as const;

type Fetcher = typeof fetch;

@Injectable()
export class OpenAiConstraintsProvider implements ExternalProviderAdapter<ExtractConstraintsRequest, ExtractConstraintsResponse> {
  readonly name = 'openai';
  private readonly policy = new ExternalCallPolicy(8_000, 1, 3, 30_000, 'openai');
  constructor(@Inject('AI_FETCHER') private readonly fetcher: Fetcher) {}

  async extract(request: ExtractConstraintsRequest): Promise<ExtractConstraintsResponse> {
    const { apiKey, model } = aiProviderConfig();
    if (!apiKey) throw new ServiceUnavailableException('AI provider chưa được cấu hình.');
    try {
      return await this.policy.execute(async (signal) => {
        const response = await this.fetcher('https://api.openai.com/v1/responses', {
          method: 'POST', signal, headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model, store: false, input: [{ role: 'system', content: CONSTRAINT_SYSTEM_PROMPT }, { role: 'user', content: buildConstraintPrompt(request) }], text: { format: { type: 'json_schema', name: 'planning_constraints', strict: true, schema: responseSchema } } }),
        });
        if (!response.ok) throw new Error(`provider status ${response.status}`);
        const body = await response.json() as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
        const text = body.output?.flatMap(({ content }) => content ?? []).find((content) => content.type === 'output_text')?.text;
        if (!text) throw new Error('missing output');
        return normalizeConstraints(JSON.parse(text) as Record<string, unknown>, request);
      });
    } catch (error) {
      throw new ServiceUnavailableException('AI provider không phản hồi thành công.', { cause: error });
    }
  }
  execute(request: ExtractConstraintsRequest) { return this.extract(request); }
}
