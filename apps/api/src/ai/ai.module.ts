import { Module } from '@nestjs/common';
import { AiController } from './ai.controller';
import { OpenAiConstraintsProvider } from './openai-constraints.provider';
import { ConstraintExtractionService } from './constraint-extraction.service';

@Module({ controllers: [AiController], providers: [{ provide: 'AI_FETCHER', useValue: fetch }, OpenAiConstraintsProvider, ConstraintExtractionService] })
export class AiModule {}
