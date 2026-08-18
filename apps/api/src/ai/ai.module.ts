import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { OpenAiConstraintsProvider } from './openai-constraints.provider';

@Module({ controllers: [AiController], providers: [{ provide: 'AI_FETCHER', useValue: fetch }, OpenAiConstraintsProvider] })
export class AiModule {}
