import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePlan, Plan } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

const include = { items: { orderBy: { orderIndex: 'asc' as const } } };

@Injectable()
export class PlansService {
  constructor(private readonly prisma: PrismaService) {}
  private map(plan: Awaited<ReturnType<PrismaService['plan']['findFirstOrThrow']>> & { items: Array<{ id: string; placeId: string; orderIndex: number; startTime: Date; endTime: Date }> }): Plan {
    return { id: plan.id, title: plan.title, startTime: plan.startTime.toISOString(), endTime: plan.endTime.toISOString(), peopleCount: plan.peopleCount, budget: plan.budget === null ? null : Number(plan.budget), items: plan.items.map((item) => ({ id: item.id, placeId: item.placeId, position: item.orderIndex, startTime: item.startTime.toISOString(), durationMinutes: Math.max(1, Math.round((item.endTime.getTime() - item.startTime.getTime()) / 60000)) })) };
  }
  async create(ownerUserId: string, input: CreatePlan): Promise<Plan> {
    const plan = await this.prisma.plan.create({ data: { ownerUserId, title: input.title, startTime: input.startTime, endTime: input.endTime, peopleCount: input.peopleCount, budget: input.budget, constraints: {}, items: { create: input.items.map((item) => ({ placeId: item.placeId, orderIndex: item.position, startTime: item.startTime, endTime: new Date(new Date(item.startTime).getTime() + item.durationMinutes * 60000), source: 'MANUAL' })) } }, include });
    return this.map(plan as never);
  }
  async list(ownerUserId: string): Promise<Plan[]> { const plans = await this.prisma.plan.findMany({ where: { ownerUserId }, orderBy: { updatedAt: 'desc' }, include }); return plans.map((plan) => this.map(plan as never)); }
  async get(ownerUserId: string, id: string): Promise<Plan> { const plan = await this.prisma.plan.findFirst({ where: { id, ownerUserId }, include }); if (!plan) throw new NotFoundException('Không tìm thấy kế hoạch.'); return this.map(plan as never); }
  async remove(ownerUserId: string, id: string): Promise<void> { const result = await this.prisma.plan.deleteMany({ where: { id, ownerUserId } }); if (result.count === 0) throw new NotFoundException('Không tìm thấy kế hoạch.'); }
}
