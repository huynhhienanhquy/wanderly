import { Controller, Get } from '@nestjs/common';
import type { InterestCategory } from '@wanderly/contracts';
import { PreferencesService } from './preferences.service';

@Controller('preferences')
export class PreferencesController {
  constructor(private readonly preferences: PreferencesService) {}
  @Get('categories') categories(): Promise<InterestCategory[]> { return this.preferences.categories(); }
}
