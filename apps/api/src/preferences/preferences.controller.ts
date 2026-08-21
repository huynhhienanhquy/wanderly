import { Body, Controller, Get, Post, Put, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { behaviorSignalSchema, updateUserPreferencesRequestSchema, type InterestCategory, type UserPreferences } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { PreferencesService } from './preferences.service';
import { BehaviorSignalsService } from './behavior-signals.service';
import { PreferenceLearningService } from './preference-learning.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferences: PreferencesService, private readonly signals: BehaviorSignalsService, private readonly learning: PreferenceLearningService) {}
  @Get('categories') categories(): Promise<InterestCategory[]> { return this.preferences.categories(); }

  @UseGuards(AuthGuard)
  @Get()
  get(@Req() request: AuthenticatedRequest): Promise<UserPreferences> { return this.preferences.get(request.user.sub); }

  @UseGuards(AuthGuard)
  @Put()
  update(@Req() request: AuthenticatedRequest, @Body() body: unknown): Promise<UserPreferences> {
    const input = updateUserPreferencesRequestSchema.safeParse(body);
    if (!input.success) throw new UnprocessableEntityException(input.error.flatten());
    return this.preferences.update(request.user.sub, input.data.categoryIds);
  }

  @UseGuards(AuthGuard)
  @Post('signals')
  recordSignal(@Req() request: AuthenticatedRequest, @Body() body: unknown) {
    const signal = behaviorSignalSchema.safeParse(body);
    if (!signal.success) throw new UnprocessableEntityException(signal.error.flatten());
    return this.signals.record(request.user.sub, signal.data);
  }

  @UseGuards(AuthGuard)
  @Post('recalculate')
  recalculate(@Req() request: AuthenticatedRequest) { return this.learning.recalculate(request.user.sub); }
}
