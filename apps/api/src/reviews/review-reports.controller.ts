import { Body, Controller, Param, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { planIdSchema, reportReviewRequestSchema } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { ReviewReportsService } from './review-reports.service';

@UseGuards(AuthGuard)
@Controller('reviews/:reviewId/reports')
export class ReviewReportsController {
  constructor(private readonly reports: ReviewReportsService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Param('reviewId') reviewId: string, @Body() body: unknown) {
    const input = reportReviewRequestSchema.safeParse(body);
    if (!input.success) throw new UnprocessableEntityException(input.error.flatten());
    return this.reports.create(request.user.sub, planIdSchema.parse(reviewId), input.data.reason);
  }
}
