import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminReportsController } from './admin-reports.controller';
import { AdminReportsService } from './admin-reports.service';
import { AdminCatalogController } from './admin-catalog.controller';
import { AdminCatalogService } from './admin-catalog.service';
import { AdminUsersController } from './admin-users.controller';
import { AdminUsersService } from './admin-users.service';

@Module({ imports: [AuthModule], controllers: [AdminReportsController, AdminCatalogController, AdminUsersController], providers: [AdminReportsService, AdminCatalogService, AdminUsersService] })
export class AdminModule {}
