import { Tabs } from 'expo-router';

export default function MainTabsLayout() {
  return <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: '#277253' }}>
    <Tabs.Screen name="explore" options={{ title: 'Khám phá' }} />
    <Tabs.Screen name="map" options={{ title: 'Bản đồ' }} />
  </Tabs>;
}
