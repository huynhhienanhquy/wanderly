import { Body, Controller, Get, Param, Patch, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { planIdSchema, upsertReviewRequestSchema } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { ReviewsService } from './reviews.service';

@Controller('places/:placeId/reviews')
export class ReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @Get()
  list(@Param('placeId') placeId: string) {
    return this.reviews.list(planIdSchema.parse(placeId));
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  upsert(@Req() request: AuthenticatedRequest, @Param('placeId') placeId: string, @Body() body: unknown) {
    const input = upsertReviewRequestSchema.safeParse(body);
    if (!input.success) throw new UnprocessableEntityException(input.error.flatten());
    return this.reviews.upsert(request.user.sub, planIdSchema.parse(placeId), input.data);
  }
}
