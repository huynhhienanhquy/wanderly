import { Body, Controller, Delete, Get, Param, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { createPlanSchema, planIdSchema } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { PlansService } from './plans.service';

@UseGuards(AuthGuard)
@Controller('plans')
export class PlansController {
  constructor(private readonly plans: PlansService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() body: unknown) {
    const result = createPlanSchema.safeParse(body);
    if (!result.success) throw new UnprocessableEntityException(result.error.flatten());
    return this.plans.create(request.user.sub, result.data);
  }

  @Get()
  list(@Req() request: AuthenticatedRequest) {
    return this.plans.list(request.user.sub);
  }

  @Get(':id')
  get(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    return this.plans.get(request.user.sub, planIdSchema.parse(id));
  }

  @Delete(':id')
  async remove(@Req() request: AuthenticatedRequest, @Param('id') id: string) {
    await this.plans.remove(request.user.sub, planIdSchema.parse(id));
    return { success: true };
  }
}
