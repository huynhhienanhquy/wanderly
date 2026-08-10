import {
  Body,
  Controller,
  Get,
  Patch,
  Req,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { updateProfileRequestSchema, type Profile } from '@wanderly/contracts';
import { AuthGuard, type AuthenticatedRequest } from '../auth/auth.guard';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('profile')
export class ProfileController {
  constructor(private readonly profiles: ProfileService) {}
  @Get()
  get(@Req() request: AuthenticatedRequest): Promise<Profile> {
    return this.profiles.get(request.user.sub);
  }
  @Patch()
  update(
    @Req() request: AuthenticatedRequest,
    @Body() body: unknown,
  ): Promise<Profile> {
    const result = updateProfileRequestSchema.safeParse(body);
    if (!result.success)
      throw new UnprocessableEntityException('Dữ liệu hồ sơ không hợp lệ.');
    return this.profiles.update(request.user.sub, result.data);
  }
}
