import { Body, Controller, Get, Param, Patch, Req, UnprocessableEntityException, UseGuards } from '@nestjs/common';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard'; import { Roles, RolesGuard } from '../auth/roles.guard'; import { AdminUsersService } from './admin-users.service';
@Roles('ADMIN') @UseGuards(AuthGuard, RolesGuard) @Controller('admin/users')
export class AdminUsersController {
  constructor(private readonly users: AdminUsersService) {}
  @Get() list() { return this.users.list(); }
  @Patch(':id/status') status(@Req() request: AuthenticatedRequest, @Param('id') id: string, @Body() body: unknown) { const status = (body as { status?: unknown }).status; if (status !== 'ACTIVE' && status !== 'LOCKED') throw new UnprocessableEntityException('Trạng thái user không hợp lệ.'); return this.users.setStatus(request.user.sub, id, status); }
}
