import { UnprocessableEntityException } from '@nestjs/common';
import { describe, expect, it, vi } from 'vitest';
import { PlacesController } from './places.controller';
import type { PlacesService } from './places.service';

describe('PlacesController', () => {
  it('normalizes query string values before calling the service', async () => {
    const list = vi.fn().mockResolvedValue({ data: [], nextCursor: null });
    const controller = new PlacesController({
      list,
    } as unknown as PlacesService);
    await controller.list({ limit: '10', sort: 'rating' });
    expect(list).toHaveBeenCalledWith({ limit: 10, sort: 'rating' });
  });

  it('rejects unsupported query values', async () => {
    const controller = new PlacesController({
      list: vi.fn(),
    } as unknown as PlacesService);
    expect(() => controller.list({ limit: '1000' })).toThrow(
      UnprocessableEntityException,
    );
  });

  it('normalizes a detail slug before calling the service', async () => {
    const detail = vi.fn().mockResolvedValue({});
    const controller = new PlacesController({
      detail,
    } as unknown as PlacesService);
    await controller.detail('Wanderly-Demo');
    expect(detail).toHaveBeenCalledWith('wanderly-demo');
  });

  it('rejects an invalid detail slug', () => {
    const controller = new PlacesController({
      detail: vi.fn(),
    } as unknown as PlacesService);
    expect(() => controller.detail('../admin')).toThrow(
      UnprocessableEntityException,
    );
  });
});
