import { describe, expect, it, vi } from 'vitest';
import { checkAdminAccess, fetchAdminPlaces, fetchAdminReports, moderateAdminReport } from './admin-api';

describe('admin api', () => {
  it('checks admin access with the bearer token', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    await expect(checkAdminAccess('http://api', 'token', fetcher)).resolves.toBe(true);
    expect(fetcher).toHaveBeenCalledWith('http://api/auth/admin-check', {
      headers: { Authorization: 'Bearer token' },
    });
  });

  it('loads open reports', async () => {
    const reports = [{ id: 'report-1' }];
    const fetcher = vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue(reports) });
    await expect(fetchAdminReports('http://api', 'token', 'OPEN', fetcher)).resolves.toEqual(reports);
  });

  it('resolves and optionally hides a reported review', async () => {
    const fetcher = vi.fn().mockResolvedValue({ ok: true });
    await moderateAdminReport('http://api', 'token', 'report-1', true, fetcher);
    expect(fetcher).toHaveBeenCalledWith('http://api/admin/review-reports/report-1', expect.objectContaining({
      method: 'PATCH',
      body: JSON.stringify({ status: 'RESOLVED', hideReview: true }),
    }));
  });

  it('loads the admin place catalog through the shared bearer request', async () => {
    const places = [{ id: 'place-1', name: 'Hồ Gươm', slug: 'ho-guom' }];
    const fetcher = vi.fn().mockResolvedValue({ ok: true, status: 200, json: vi.fn().mockResolvedValue(places) });
    await expect(fetchAdminPlaces('http://api', 'token', fetcher)).resolves.toEqual(places);
    expect(fetcher).toHaveBeenCalledWith('http://api/admin/catalog/places', expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer token' }),
    }));
  });
});
