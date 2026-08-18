import { Body, Controller, Post, UnprocessableEntityException } from '@nestjs/common';
import { candidateRequestSchema, type CandidateResponse } from '@wanderly/contracts';
import { RecommendationsService } from './recommendations.service';

@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendations: RecommendationsService) {}
  @Post('candidates') candidates(@Body() body: unknown): Promise<CandidateResponse> {
    const request = candidateRequestSchema.safeParse(body);
    if (!request.success) throw new UnprocessableEntityException(request.error.flatten());
    return this.recommendations.candidates(request.data);
  }
}
