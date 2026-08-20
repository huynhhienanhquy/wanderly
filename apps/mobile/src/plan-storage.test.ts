import * as SecureStore from 'expo-secure-store';
import { getMobilePlan, saveMobilePlan, type MobilePlan } from './plan-storage';

const plan: MobilePlan = { title: 'Hà Nội cuối tuần', date: '2026-08-22', budget: 1000000, peopleCount: 2, items: [{ id: 'place-1', slug: 'ho-guom', name: 'Hồ Gươm', startTime: '09:00', priceMin: 0, latitude: 21.0285, longitude: 105.8542 }] };

describe('mobile plan persistence', () => {
  it('round-trips a generated itinerary through secure storage', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue(JSON.stringify(plan));
    await saveMobilePlan(plan);
    await expect(getMobilePlan()).resolves.toEqual(plan);
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith('wanderlyCurrentPlan', JSON.stringify(plan));
  });

  it('recovers safely from corrupted cached content', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue('{broken');
    await expect(getMobilePlan()).resolves.toBeNull();
  });
});
