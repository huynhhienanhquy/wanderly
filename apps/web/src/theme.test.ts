import { describe, expect, it } from 'vitest';
import { applyTheme, resolveTheme } from './theme';

describe('web theme', () => {
  it('prefers an explicit theme over the system setting', () => {
    expect(resolveTheme('light', true)).toBe('light');
    expect(resolveTheme(null, true)).toBe('dark');
  });

  it('applies the theme through a data attribute', () => {
    const root = { dataset: {} as DOMStringMap };
    applyTheme(root, 'dark');
    expect(root.dataset.theme).toBe('dark');
  });
});
