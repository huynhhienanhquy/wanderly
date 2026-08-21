import { expect, it } from 'vitest'; import type { PrismaService } from '../database/prisma.service'; import { AdminUsersService } from './admin-users.service';
it('prevents an admin from locking their own account', async () => { const service = new AdminUsersService({} as PrismaService); await expect(service.setStatus('same', 'same', 'LOCKED')).rejects.toThrow('tự khóa'); });
