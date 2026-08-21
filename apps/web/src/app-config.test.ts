import { describe, expect, it } from 'vitest';
import { readWebConfig } from './app-config';

describe('readWebConfig', () => {
  it('uses a local API fallback and normalizes trailing slash', () => {
    expect(readWebConfig({})).toEqual({ apiUrl: 'http://localhost:4000' });
    expect(readWebConfig({ VITE_API_URL: 'https://api.wanderly.vn/' })).toEqual({ apiUrl: 'https://api.wanderly.vn' });
  });

  it('rejects unsupported API protocols', () => {
    expect(() => readWebConfig({ VITE_API_URL: 'file:///tmp/api' })).toThrow('http or https');
  });
});
