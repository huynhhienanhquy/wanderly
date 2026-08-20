import { Body, Controller, Delete, Get, Param, Patch, Post, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard'; import { Roles, RolesGuard } from '../auth/roles.guard';
import { AdminCatalogService } from './admin-catalog.service';
@Roles('ADMIN') @UseGuards(AuthGuard, RolesGuard) @Controller('admin/catalog')
export class AdminCatalogController {
  constructor(private readonly catalog: AdminCatalogService) {}
  @Get('places') places() { return this.catalog.places(); }
  @Post('places') createPlace(@Body() body: unknown) { return this.catalog.upsertPlace(body); }
  @Patch('places/:id') updatePlace(@Param('id') id: string, @Body() body: unknown) { return this.catalog.upsertPlace(body, id); }
  @Delete('places/:id') removePlace(@Param('id') id: string) { return this.catalog.removePlace(id); }
  @Get('categories') categories() { return this.catalog.categories(); }
  @Post('categories') category(@Body() body: unknown) { const input = body as { slug?: unknown; name?: unknown }; if (typeof input.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug) || typeof input.name !== 'string' || !input.name.trim() || input.name.length > 100) throw new UnprocessableEntityException('Danh mục không hợp lệ.'); return this.catalog.upsertCategory(input.slug, input.name.trim()); }
  @Delete('categories/:id') removeCategory(@Param('id') id: string) { return this.catalog.removeCategory(id); }
}
