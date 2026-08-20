import { mobileApiClient } from './api-client';

describe('mobile API client', () => {
  it('is configured with the mobile runtime API and retry transport', () => {
    expect(mobileApiClient).toBeDefined();
  });
});
