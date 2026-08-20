import { Controller, Get, UseGuards } from '@nestjs/common'; import { AuthGuard } from '../auth/auth.guard'; import { Roles, RolesGuard } from '../auth/roles.guard'; import { AdminDashboardService } from './admin-dashboard.service';
@Roles('ADMIN') @UseGuards(AuthGuard, RolesGuard) @Controller('admin/dashboard')
export class AdminDashboardController { constructor(private readonly dashboard: AdminDashboardService) {} @Get() summary() { return this.dashboard.summary(); } }
