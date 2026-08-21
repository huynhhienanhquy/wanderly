import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { verifyAccessToken, type AccessTokenClaims } from './access-token';

export type AuthenticatedRequest = Request & { user: AccessTokenClaims };

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const [scheme, token] = request.headers.authorization?.split(' ') ?? [];
    const claims =
      scheme === 'Bearer' && token ? verifyAccessToken(token) : null;
    if (!claims)
      throw new UnauthorizedException(
        'Access token không hợp lệ hoặc đã hết hạn.',
      );
    request.user = claims;
    return true;
  }
}
