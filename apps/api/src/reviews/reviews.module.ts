import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';
import { ReviewReportsController } from './review-reports.controller';
import { ReviewReportsService } from './review-reports.service';

@Module({ imports: [AuthModule], controllers: [ReviewsController, ReviewReportsController], providers: [ReviewsService, ReviewReportsService] })
export class ReviewsModule {}
