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
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  loginRequestSchema,
  refreshTokenRequestSchema,
  registerRequestSchema,
  type AuthResponse,
} from '@wanderly/contracts';
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

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Đăng nhập thành công.' })
  @ApiUnauthorizedResponse({
    description: 'Thông tin đăng nhập không chính xác.',
  })
  async login(@Body() body: unknown): Promise<AuthResponse> {
    const result = loginRequestSchema.safeParse(body);
    if (!result.success) {
      throw new UnprocessableEntityException('Dữ liệu đăng nhập không hợp lệ.');
    }
    return this.authService.login(result.data);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Làm mới session thành công.' })
  @ApiUnauthorizedResponse({ description: 'Refresh token không hợp lệ.' })
  async refresh(@Body() body: unknown): Promise<AuthResponse> {
    const result = refreshTokenRequestSchema.safeParse(body);
    if (!result.success) {
      throw new UnprocessableEntityException('Refresh token không hợp lệ.');
    }
    return this.authService.refresh(result.data);
  }

  @Post('logout')
  @HttpCode(HttpStatus.NO_CONTENT)
  async logout(@Body() body: unknown): Promise<void> {
    const result = refreshTokenRequestSchema.safeParse(body);
    if (!result.success) {
      throw new UnprocessableEntityException('Refresh token không hợp lệ.');
    }
    await this.authService.logout(result.data);
  }
}
