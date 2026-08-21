import { Module } from '@nestjs/common';
import { PreferencesController } from './preferences.controller';
import { PreferencesService } from './preferences.service';
import { BehaviorSignalsService } from './behavior-signals.service';
import { PreferenceLearningService } from './preference-learning.service';

@Module({ controllers: [PreferencesController], providers: [PreferencesService, BehaviorSignalsService, PreferenceLearningService], exports: [BehaviorSignalsService, PreferenceLearningService] })
export class PreferencesModule {}
