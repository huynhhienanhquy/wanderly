import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="plan" />
        <Stack.Screen name="planner" />
        <Stack.Screen name="places/[slug]" />
        <Stack.Screen name="plans/shared/[shareToken]" />
        <Stack.Screen name="favorites" />
        <Stack.Screen name="events" />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}
