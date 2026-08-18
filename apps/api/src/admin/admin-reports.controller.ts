import { Body, Controller, Get, Param, Patch, Query, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { moderateReviewReportRequestSchema, planIdSchema } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { AdminReportsService } from './admin-reports.service';

@Roles('ADMIN')
@UseGuards(AuthGuard, RolesGuard)
@Controller('admin/review-reports')
export class AdminReportsController {
  constructor(private readonly reports: AdminReportsService) {}

  @Get()
  list(@Query('status') status?: 'OPEN' | 'RESOLVED' | 'DISMISSED') {
    return this.reports.list(status);
  }

  @Patch(':id')
  moderate(@Req() request: AuthenticatedRequest, @Param('id') id: string, @Body() body: unknown) {
    const input = moderateReviewReportRequestSchema.safeParse(body);
    if (!input.success) throw new UnprocessableEntityException(input.error.flatten());
    return this.reports.moderate(request.user.sub, planIdSchema.parse(id), input.data);
  }
}
