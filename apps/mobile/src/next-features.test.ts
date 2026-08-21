import { canRequestNotifications, hasAnalyticsConsent, isOfflineStatus } from './next-features';

describe('mobile feature policies', () => {
  it('requests notifications only while permission is undetermined', () => {
    expect(canRequestNotifications('undetermined')).toBe(true);
    expect(canRequestNotifications('granted')).toBe(false);
    expect(canRequestNotifications('denied')).toBe(false);
  });

  it('recognizes explicit analytics consent and offline state', () => {
    expect(hasAnalyticsConsent('granted')).toBe(true);
    expect(hasAnalyticsConsent('denied')).toBe(false);
    expect(isOfflineStatus('OFFLINE')).toBe(true);
  });
});
