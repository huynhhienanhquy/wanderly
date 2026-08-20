import { Body, Controller, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { extractConstraintsRequestSchema, type ExtractConstraintsResponse } from '@wanderly/contracts';
import { ConstraintExtractionService } from './constraint-extraction.service';
import { RateLimit, RateLimitGuard } from '../security/rate-limit.guard';

@RateLimit(10) @UseGuards(RateLimitGuard) @Controller('ai')
export class AiController {
  constructor(private readonly provider: ConstraintExtractionService) {}
  @Post('constraints') extract(@Body() body: unknown): Promise<ExtractConstraintsResponse> {
    const request = extractConstraintsRequestSchema.safeParse(body);
    if (!request.success) throw new UnprocessableEntityException(request.error.flatten());
    return this.provider.extract(request.data);
  }
}
