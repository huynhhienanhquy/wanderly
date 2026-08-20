import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { BehaviorSignalsService } from './behavior-signals.service';

@Module({ controllers: [PreferencesController], providers: [PreferencesService, BehaviorSignalsService], exports: [BehaviorSignalsService] })
export class PreferencesModule {}
