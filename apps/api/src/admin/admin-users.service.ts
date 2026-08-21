import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';
@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}
  list() { return this.prisma.user.findMany({ orderBy: { createdAt: 'desc' }, take: 100, select: { id: true, email: true, profile: { select: { displayName: true } }, role: true, status: true, createdAt: true } }); }
  async setStatus(adminUserId: string, userId: string, status: 'ACTIVE' | 'LOCKED') {
    if (adminUserId === userId && status === 'LOCKED') throw new BadRequestException('Admin không thể tự khóa tài khoản.');
    const current = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, status: true } });
    if (!current) throw new NotFoundException('Không tìm thấy người dùng.');
    return this.prisma.$transaction(async (tx) => {
      const user = await tx.user.update({ where: { id: userId }, data: { status }, select: { id: true, email: true, profile: { select: { displayName: true } }, role: true, status: true, createdAt: true } });
      await tx.adminAuditLog.create({ data: { adminUserId, action: 'UPDATE_USER_STATUS', entityType: 'User', entityId: userId, beforeData: current, afterData: { status } } });
      return user;
    });
  }
}
