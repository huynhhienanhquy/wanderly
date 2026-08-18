import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { planIdSchema } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { FavoritesService } from './favorites.service';

@UseGuards(AuthGuard)
@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favorites: FavoritesService) {}

  @Get()
  list(@Req() request: AuthenticatedRequest) {
    return this.favorites.list(request.user.sub);
  }

  @Post(':placeId')
  add(@Req() request: AuthenticatedRequest, @Param('placeId') placeId: string) {
    return this.favorites.add(request.user.sub, planIdSchema.parse(placeId));
  }

  @Delete(':placeId')
  async remove(@Req() request: AuthenticatedRequest, @Param('placeId') placeId: string) {
    await this.favorites.remove(request.user.sub, planIdSchema.parse(placeId));
    return { success: true };
  }
}
