import { describe, expect, it } from 'vitest';
import { validateFinalPlan } from './plan-validation';

const validInput = {
  title: 'Cuối tuần Hà Nội',
  date: '2026-08-15',
  endTime: '18:00',
  itemCount: 1,
  loadedPlaceCount: 1,
  groups: {},
};

describe('final plan validation', () => {
  it('accepts a complete plan without constraint issues', () => {
    expect(validateFinalPlan(validInput)).toEqual({ valid: true, issues: [] });
  });

  it('reports missing metadata, places, and provider data with categories', () => {
    expect(validateFinalPlan({ ...validInput, title: '', date: '', endTime: '', itemCount: 1, loadedPlaceCount: 0 })).toEqual({
      valid: false,
      issues: [
        { category: 'metadata', message: 'Kế hoạch chưa có tên.' },
        { category: 'metadata', message: 'Kế hoạch chưa có ngày.' },
        { category: 'metadata', message: 'Kế hoạch chưa có giờ kết thúc.' },
        { category: 'places', message: 'Chưa tải đủ dữ liệu địa điểm để kiểm tra.' },
      ],
    });
  });

  it('deduplicates issues within the same category', () => {
    const result = validateFinalPlan({ ...validInput, groups: { weather: ['Mưa', 'Mưa'], budget: ['Vượt ngân sách'] } });
    expect(result).toEqual({
      valid: false,
      issues: [
        { category: 'weather', message: 'Mưa' },
        { category: 'budget', message: 'Vượt ngân sách' },
      ],
    });
  });
});
