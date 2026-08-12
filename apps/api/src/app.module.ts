import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { PlacesModule } from './places/places.module';

@Module({
  imports: [DatabaseModule, PlacesModule],
  controllers: [HealthController],
})
export class AppModule {}
