import * as SecureStore from 'expo-secure-store';
import { flushMutations } from './offline-mutations';

const secureStore = jest.mocked(SecureStore);

describe('offline mutation queue', () => {
  beforeEach(() => jest.clearAllMocks());

  it('flushes queued mutations with the authenticated session', async () => {
    secureStore.getItemAsync.mockResolvedValue(JSON.stringify([
      { method: 'POST', path: 'favorites/place-1' },
    ]));
    const fetcher = jest.fn().mockResolvedValue({ ok: true });

    await expect(flushMutations('https://api.wanderly.test', fetcher, async () => 'access-token')).resolves.toBe(1);
    expect(fetcher).toHaveBeenCalledWith('https://api.wanderly.test/favorites/place-1', expect.objectContaining({
      headers: expect.objectContaining({ Authorization: 'Bearer access-token' }),
    }));
    expect(secureStore.setItemAsync).toHaveBeenCalledWith('wanderlyOfflineMutations', '[]');
  });

  it('keeps the queue when no authenticated session is available', async () => {
    secureStore.getItemAsync.mockResolvedValue(JSON.stringify([{ method: 'POST', path: 'favorites/place-1' }]));
    const fetcher = jest.fn();

    await expect(flushMutations('https://api.wanderly.test', fetcher, async () => null)).resolves.toBe(0);
    expect(fetcher).not.toHaveBeenCalled();
    expect(secureStore.setItemAsync).not.toHaveBeenCalled();
  });
});
