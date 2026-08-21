import { Controller, Get, Query, UseGuards } from '@nestjs/common'; import { AuthGuard } from '../auth/auth.guard'; import { Roles, RolesGuard } from '../auth/roles.guard'; import { AdminAiUsageService } from './admin-ai-usage.service';
@Roles('ADMIN') @UseGuards(AuthGuard, RolesGuard) @Controller('admin/ai-usage')
export class AdminAiUsageController { constructor(private readonly usage: AdminAiUsageService) {} @Get() summary(@Query('days') days?: string) { return this.usage.summary(days ? Number(days) : 30); } }
