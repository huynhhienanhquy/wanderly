import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { PlacesModule } from './places/places.module';
import { PlansModule } from './plans/plans.module';

@Module({
  imports: [DatabaseModule, AuthModule, PlacesModule, PlansModule],
  controllers: [HealthController],
})
export class AppModule {}
