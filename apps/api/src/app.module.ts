import { Module } from '@nestjs/common';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { HealthController } from './health.controller';
import { FavoritesModule } from './favorites/favorites.module';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PlansModule } from './plans/plans.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [DatabaseModule, AuthModule, AdminModule, ProfileModule, FavoritesModule, PlacesModule, ReviewsModule, PlansModule],
  controllers: [HealthController],
})
export class AppModule {}
