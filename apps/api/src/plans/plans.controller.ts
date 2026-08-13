import { Body, Controller, Delete, Get, Headers, Param, Post, UnprocessableEntityException, UnauthorizedException } from '@nestjs/common';
import { createPlanSchema, planIdSchema } from '@wanderly/contracts';
import { PlansService } from './plans.service';

@Controller('plans')
export class PlansController {
  constructor(private readonly plans: PlansService) {}
  private owner(value?: string): string { const result = planIdSchema.safeParse(value); if (!result.success) throw new UnauthorizedException('Thiếu user context.'); return result.data; }
  @Post() create(@Headers('x-user-id') userId: string | undefined, @Body() body: unknown) { const result = createPlanSchema.safeParse(body); if (!result.success) throw new UnprocessableEntityException(result.error.flatten()); return this.plans.create(this.owner(userId), result.data); }
  @Get() list(@Headers('x-user-id') userId?: string) { return this.plans.list(this.owner(userId)); }
  @Get(':id') get(@Headers('x-user-id') userId: string | undefined, @Param('id') id: string) { return this.plans.get(this.owner(userId), planIdSchema.parse(id)); }
  @Delete(':id') async remove(@Headers('x-user-id') userId: string | undefined, @Param('id') id: string) { await this.plans.remove(this.owner(userId), planIdSchema.parse(id)); return { success: true }; }
}
