import { Controller, Get } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiProperty,
  ApiTags,
} from '@nestjs/swagger';
import { healthResponseSchema } from '@wanderly/contracts';

class HealthResponseDto {
  @ApiProperty({ example: 'wanderly-api' })
  service!: string;

  @ApiProperty({ enum: ['ok'], example: 'ok' })
  status!: 'ok';

  @ApiProperty({ example: '2026-08-10T02:30:00.000Z', format: 'date-time' })
  timestamp!: string;
}

@ApiTags('System')
@Controller('health')
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Kiểm tra API process' })
  @ApiOkResponse({ type: HealthResponseDto })
  getHealth() {
    return healthResponseSchema.parse({
      service: 'wanderly-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
