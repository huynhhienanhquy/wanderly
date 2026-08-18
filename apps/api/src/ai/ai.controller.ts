import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common';
import { extractConstraintsRequestSchema, type ExtractConstraintsResponse } from '@wanderly/contracts';
import { OpenAiConstraintsProvider } from './openai-constraints.provider';

@Controller('ai')
export class AiController {
  constructor(private readonly provider: OpenAiConstraintsProvider) {}
  @Post('constraints') extract(@Body() body: unknown): Promise<ExtractConstraintsResponse> {
    const request = extractConstraintsRequestSchema.safeParse(body);
    if (!request.success) throw new UnprocessableEntityException(request.error.flatten());
    return this.provider.extract(request.data);
  }
}
