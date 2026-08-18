import { Body, Controller, Get, Put, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { updateUserPreferencesRequestSchema, type InterestCategory, type UserPreferences } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferences: PreferencesService) {}
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
}
