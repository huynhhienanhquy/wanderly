import { Controller, Get } from '@nestjs/common';
import { healthResponseSchema } from '@wanderly/contracts';

@Controller('health')
export class HealthController {
  @Get()
  getHealth() {
    return healthResponseSchema.parse({
      service: 'wanderly-api',
      status: 'ok',
      timestamp: new Date().toISOString(),
    });
  }
}
