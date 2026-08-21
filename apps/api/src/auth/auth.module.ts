import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswordResetMailerService } from './password-reset-mailer.service';
import { AuthGuard } from './auth.guard';
import { RolesGuard } from './roles.guard';
import { RateLimitGuard } from '../security/rate-limit.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, PasswordResetMailerService, AuthGuard, RolesGuard, RateLimitGuard],
  exports: [AuthGuard, RolesGuard],
})
export class AuthModule {}
