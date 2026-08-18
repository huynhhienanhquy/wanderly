import { Inject, Injectable, ServiceUnavailableException } from '@nestjs/common';
import { extractConstraintsResponseSchema, type ExtractConstraintsRequest, type ExtractConstraintsResponse } from '@wanderly/contracts';
import { buildConstraintPrompt, CONSTRAINT_SYSTEM_PROMPT } from './constraint-prompt';

const responseSchema = {
  type: 'object', additionalProperties: false, required: ['constraints', 'missingFields', 'warnings'],
  properties: {
    constraints: {
      type: 'object', additionalProperties: false,
      required: ['peopleCount', 'budget', 'currency', 'interests', 'excludedCategories', 'travelMode', 'notes'],
      properties: {
        peopleCount: { type: 'integer', minimum: 1 }, budget: { type: ['integer', 'null'], minimum: 0 },
        currency: { type: 'string' }, interests: { type: 'array', items: { type: 'string' } },
        excludedCategories: { type: 'array', items: { type: 'string' } },
        travelMode: { type: 'string', enum: ['WALK', 'BIKE', 'DRIVE', 'TRANSIT'] }, notes: { type: ['string', 'null'] },
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
    const response = await this.fetcher('https://api.openai.com/v1/responses', {
      method: 'POST', headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? 'gpt-5.6-terra', store: false, input: [{ role: 'system', content: CONSTRAINT_SYSTEM_PROMPT }, { role: 'user', content: buildConstraintPrompt(request) }], text: { format: { type: 'json_schema', name: 'planning_constraints', strict: true, schema: responseSchema } } }),
    });
    if (!response.ok) throw new ServiceUnavailableException('AI provider không phản hồi thành công.');
    const body = await response.json() as { output?: Array<{ content?: Array<{ type?: string; text?: string }> }> };
    const text = body.output?.flatMap(({ content }) => content ?? []).find((content) => content.type === 'output_text')?.text;
    if (!text) throw new ServiceUnavailableException('AI provider không trả dữ liệu.');
    return extractConstraintsResponseSchema.parse(JSON.parse(text));
  }
}
