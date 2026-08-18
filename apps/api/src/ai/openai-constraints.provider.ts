import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { extractConstraintsResponseSchema, type ExtractConstraintsRequest, type ExtractConstraintsResponse } from '@wanderly/contracts';
import { buildConstraintPrompt, CONSTRAINT_SYSTEM_PROMPT } from './constraint-prompt';
import { normalizeConstraints } from './constraint-normalizer';

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
export class OpenAiConstraintsProvider {
  constructor(@Inject('AI_FETCHER') private readonly fetcher: Fetcher) {}

  async extract(request: ExtractConstraintsRequest): Promise<ExtractConstraintsResponse> {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new ServiceUnavailableException('AI provider chưa được cấu hình.');
    for (let attempt = 0; attempt < 2; attempt += 1) {
      try {
        const response = await this.fetcher('https://api.openai.com/v1/responses', {
          method: 'POST', signal: AbortSignal.timeout(8_000), headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? 'gpt-5.6-terra', store: false, input: [{ role: 'system', content: CONSTRAINT_SYSTEM_PROMPT }, { role: 'user', content: buildConstraintPrompt(request) }], text: { format: { type: 'json_schema', name: 'planning_constraints', strict: true, schema: responseSchema } } }),
        });
        if (!response.ok) throw new Error(`provider status ${response.status}`);
        const body = await response.json() as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
        const text = body.output?.flatMap(({ content }) => content ?? []).find((content) => content.type === 'output_text')?.text;
        if (!text) throw new Error('missing output');
        return normalizeConstraints(JSON.parse(text) as Record<string, unknown>, request);
      } catch (error) {
        if (attempt === 1) throw new ServiceUnavailableException('AI provider không phản hồi thành công.', { cause: error });
      }
    }
    throw new ServiceUnavailableException('AI provider không phản hồi thành công.');
  }
}
