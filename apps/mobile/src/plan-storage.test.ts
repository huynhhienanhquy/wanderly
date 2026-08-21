import * as SecureStore from 'expo-secure-store';
import { getMobilePlan, removeMobilePlanItem, replaceMobilePlanItem, saveMobilePlan, type MobilePlan } from './plan-storage';
import { formatPlanShareText } from './next-features';

const plan: MobilePlan = { title: 'Hà Nội cuối tuần', date: '2026-08-22', budget: 1000000, peopleCount: 2, items: [{ id: 'place-1', slug: 'ho-guom', name: 'Hồ Gươm', startTime: '09:00', priceMin: 0, latitude: 21.0285, longitude: 105.8542 }] };

describe('mobile plan persistence', () => {
  it('removes and replaces itinerary items without mutating the original plan', () => {
    const replacement = { ...plan.items[0], id: 'place-2', slug: 'van-mieu', name: 'Văn Miếu' };
    expect(removeMobilePlanItem(plan, 'place-1').items).toEqual([]);
    expect(replaceMobilePlanItem(plan, 'place-1', replacement).items).toEqual([{ ...replacement, startTime: '09:00' }]);
    expect(plan.items[0].name).toBe('Hồ Gươm');
    expect(formatPlanShareText('Ngày khám phá', plan.items)).toContain('Hồ Gươm');
  });
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

  it('rejects structurally invalid cached plans', async () => {
    jest.mocked(SecureStore.getItemAsync).mockResolvedValue(JSON.stringify({ title: 'Thiếu dữ liệu', items: [] }));
    await expect(getMobilePlan()).resolves.toBeNull();
  });
});
