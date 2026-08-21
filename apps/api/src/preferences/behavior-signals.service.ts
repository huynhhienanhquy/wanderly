import { Injectable } from '@nestjs/common';
import type { BehaviorSignal } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class BehaviorSignalsService {
  constructor(private readonly prisma: PrismaService) {}

  async record(userId: string, signal: BehaviorSignal) {
    return this.prisma.userFeedback.create({
      data: {
        userId,
        feedbackType: signal.type,
        placeId: signal.placeId,
        planId: signal.planId,
        planItemId: signal.planItemId,
        rating: signal.rating,
      },
      select: { id: true, feedbackType: true, createdAt: true },
    });
  }
}
