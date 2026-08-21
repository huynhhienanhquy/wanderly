import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, SetMetadata } from '@nestjs/common'; import { Reflector } from '@nestjs/core'; import type { Request } from 'express';
const RATE_LIMIT = 'rate-limit';
export const RateLimit = (max: number, windowMs = 60_000) => SetMetadata(RATE_LIMIT, { max, windowMs });
export class FixedWindowRateLimiter {
  private readonly buckets = new Map<string, { count: number; resetsAt: number }>();
  consume(key: string, max: number, windowMs: number, now = Date.now()) { const current = this.buckets.get(key); const bucket = !current || current.resetsAt <= now ? { count: 0, resetsAt: now + windowMs } : current; bucket.count += 1; this.buckets.set(key, bucket); if (this.buckets.size > 10_000) for (const [entry, value] of this.buckets) if (value.resetsAt <= now) this.buckets.delete(entry); return bucket.count <= max; }
}
@Injectable()
export class RateLimitGuard implements CanActivate {
  private readonly limiter = new FixedWindowRateLimiter();
  constructor(private readonly reflector: Reflector) {}
  canActivate(context: ExecutionContext) { const rule = this.reflector.getAllAndOverride<{ max: number; windowMs: number }>(RATE_LIMIT, [context.getHandler(), context.getClass()]); if (!rule) return true; const request = context.switchToHttp().getRequest<Request>(); const key = `${request.ip ?? request.socket.remoteAddress ?? 'unknown'}:${request.baseUrl}:${request.route?.path ?? ''}`; if (!this.limiter.consume(key, rule.max, rule.windowMs)) throw new HttpException('Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.', HttpStatus.TOO_MANY_REQUESTS); return true; }
}
