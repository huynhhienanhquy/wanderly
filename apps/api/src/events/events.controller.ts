import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { eventInputSchema } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}
  @Get() list() { return this.events.listPublished(); }
  @UseGuards(AuthGuard, RolesGuard) @Roles('ADMIN') @Get('admin') adminList() { return this.events.listAll(); }
  @UseGuards(AuthGuard, RolesGuard) @Roles('ADMIN') @Post() create(@Body() body: unknown) { const input = eventInputSchema.safeParse(body); if (!input.success) throw new UnprocessableEntityException(input.error.flatten()); return this.events.create(input.data); }
  @UseGuards(AuthGuard, RolesGuard) @Roles('ADMIN') @Patch(':id') update(@Param('id') id: string, @Body() body: unknown) { const input = eventInputSchema.safeParse(body); if (!input.success) throw new UnprocessableEntityException(input.error.flatten()); return this.events.update(id, input.data); }
  @UseGuards(AuthGuard, RolesGuard) @Roles('ADMIN') @Delete(':id') remove(@Param('id') id: string, @Req() _request: AuthenticatedRequest) { return this.events.remove(id); }
}
