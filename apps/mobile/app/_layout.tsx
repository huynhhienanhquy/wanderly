import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';
import { MobileErrorBoundary } from '../src/error-boundary';
import { flushMobileTelemetry } from '../src/telemetry';
import { mobileConfig } from '../src/app-config';
import { useEffect } from 'react';
import { flushMutations } from '../src/offline-mutations';
import { AppThemeProvider, useAppTheme } from '../src/theme';
import { getAccessToken } from '../src/auth-storage';

function RootNavigator() {
  const { theme } = useAppTheme();
  useEffect(() => {
    void flushMobileTelemetry(mobileConfig.apiUrl);
    void flushMutations(mobileConfig.apiUrl, fetch, getAccessToken);
  }, []);
  return (
    <MobileErrorBoundary><>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="plan" />
        <Stack.Screen name="planner" />
        <Stack.Screen name="places/[slug]" />
        <Stack.Screen name="plans/shared/[shareToken]" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="events" />
        <Stack.Screen name="profile" />
        <Stack.Screen name="reviews" />
        <Stack.Screen name="preferences" />
        <Stack.Screen name="review-submit" />
        <Stack.Screen name="review-report" />
        <Stack.Screen name="notifications" />
        <Stack.Screen name="settings" />
      </Stack>
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} />
    </></MobileErrorBoundary>
  );
}

export default function RootLayout() {
  return <AppThemeProvider><RootNavigator /></AppThemeProvider>;
}
