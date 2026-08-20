import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { AdminReportsController } from './admin-reports.controller';
import { AdminReportsService } from './admin-reports.service';
import { AdminCatalogController } from './admin-catalog.controller';
import { AdminCatalogService } from './admin-catalog.service';

@Module({ imports: [AuthModule], controllers: [AdminReportsController, AdminCatalogController], providers: [AdminReportsService, AdminCatalogService] })
export class AdminModule {}
