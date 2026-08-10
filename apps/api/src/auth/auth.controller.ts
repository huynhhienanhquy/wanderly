import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { registerRequestSchema, type AuthResponse } from '@wanderly/contracts';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Đăng ký thành công.' })
  @ApiConflictResponse({ description: 'Email đã được sử dụng.' })
  async register(@Body() body: unknown): Promise<AuthResponse> {
    const result = registerRequestSchema.safeParse(body);
    if (!result.success) {
      throw new UnprocessableEntityException({
        message: 'Dữ liệu đăng ký không hợp lệ.',
        issues: result.error.issues.map((issue) => ({
          path: issue.path.join('.'),
          message: issue.message,
        })),
      });
    }
    return this.authService.register(result.data);
  }
}
