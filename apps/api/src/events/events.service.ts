import { Injectable, NotFoundException } from '@nestjs/common';
import type { EventInput, PlanningConstraints, WanderlyEvent } from '@wanderly/contracts';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}
  listPublished(): Promise<WanderlyEvent[]> { return this.prisma.event.findMany({ where: { status: 'PUBLISHED', endTime: { gte: new Date() } }, orderBy: { startTime: 'asc' } }).then((rows) => rows.map(this.map)); }
  listAll(): Promise<WanderlyEvent[]> { return this.prisma.event.findMany({ orderBy: { startTime: 'desc' } }).then((rows) => rows.map(this.map)); }
  async recommend(constraints: PlanningConstraints): Promise<WanderlyEvent[]> {
    const day = constraints.date ? new Date(`${constraints.date}T00:00:00.000Z`) : new Date();
    const nextDay = new Date(day); nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    const rows = await this.prisma.event.findMany({ where: { status: 'PUBLISHED', startTime: { lt: nextDay }, endTime: { gte: day }, ...(constraints.budget === null ? {} : { OR: [{ priceMin: null }, { priceMin: { lte: constraints.budget } }] }) }, include: { place: { include: { categories: { include: { category: true } } } } }, orderBy: { startTime: 'asc' }, take: 20 });
    return rows.filter((event) => constraints.interests.length === 0 || event.place?.categories.some(({ category }) => constraints.interests.includes(category.slug))).map(this.map);
  }
  create(input: EventInput): Promise<WanderlyEvent> { return this.prisma.event.create({ data: this.data(input) }).then(this.map); }
  async update(id: string, input: EventInput): Promise<WanderlyEvent> {
    const result = await this.prisma.event.updateMany({ where: { id }, data: this.data(input) });
    if (!result.count) throw new NotFoundException('Không tìm thấy sự kiện.');
    return this.map(await this.prisma.event.findUniqueOrThrow({ where: { id } }));
  }
  async remove(id: string): Promise<void> { const result = await this.prisma.event.deleteMany({ where: { id } }); if (!result.count) throw new NotFoundException('Không tìm thấy sự kiện.'); }
  private data(input: EventInput) { return { ...input, startTime: new Date(input.startTime), endTime: new Date(input.endTime) }; }
  private map(row: { id: string; placeId: string | null; title: string; description: string | null; startTime: Date; endTime: Date; priceMin: bigint | null; priceMax: bigint | null; bookingUrl: string | null; status: 'DRAFT' | 'PUBLISHED' | 'CANCELLED' }): WanderlyEvent { return { ...row, startTime: row.startTime.toISOString(), endTime: row.endTime.toISOString(), priceMin: row.priceMin === null ? null : Number(row.priceMin), priceMax: row.priceMax === null ? null : Number(row.priceMax) }; }
}
