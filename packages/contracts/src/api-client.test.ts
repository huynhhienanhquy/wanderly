import { describe, expect, it, vi } from 'vitest';
import { z } from 'zod';
import { ApiClientError, WanderlyApiClient } from './api-client';

describe('WanderlyApiClient', () => {
  it('refreshes once and preserves the request ID', async () => {
    const fetcher = vi.fn()
      .mockResolvedValueOnce(new Response(null, { status: 401 }))
      .mockResolvedValueOnce(Response.json({ value: 'ok' }));
    const client = new WanderlyApiClient({
      baseUrl: 'https://api.wanderly.test/',
      getAccessToken: () => 'expired',
      refreshAccessToken: () => 'fresh',
      fetch: fetcher,
      createRequestId: () => 'request-1',
    });

    await expect(client.request('/resource', { schema: z.object({ value: z.string() }) }))
      .resolves.toEqual({ value: 'ok' });
    expect(fetcher).toHaveBeenCalledTimes(2);
    const firstHeaders = new Headers(fetcher.mock.calls[0]?.[1]?.headers);
    const secondHeaders = new Headers(fetcher.mock.calls[1]?.[1]?.headers);
    expect([firstHeaders.get('x-request-id'), secondHeaders.get('x-request-id')]).toEqual(['request-1', 'request-1']);
    expect(secondHeaders.get('authorization')).toBe('Bearer fresh');
  });

  it('maps an API error response', async () => {
    const fetcher = vi.fn().mockResolvedValue(Response.json({
      code: 'PLACE_NOT_FOUND', message: 'Không tìm thấy địa điểm', requestId: 'api-request',
    }, { status: 404 }));
    const client = new WanderlyApiClient({ baseUrl: 'https://api.wanderly.test', fetch: fetcher });

    const error = await client.request('/places/missing', { schema: z.unknown() }).catch((reason: unknown) => reason);
    expect(error).toBeInstanceOf(ApiClientError);
    expect(error).toEqual(expect.objectContaining({ status: 404, error: expect.objectContaining({ code: 'PLACE_NOT_FOUND' }) }));
  });
});
