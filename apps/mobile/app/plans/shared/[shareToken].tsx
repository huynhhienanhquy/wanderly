import { toWebUrl } from '@wanderly/contracts';
import { router, useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '../../../src/ui';
import { isSafeDeepLinkToken } from '../../../src/mobile-hardening';

export default function SharedPlanScreen() {
  const { shareToken } = useLocalSearchParams<{ shareToken: string }>();
  const token = Array.isArray(shareToken) ? shareToken[0] : shareToken;
  const webUrl = token ? toWebUrl('https://wanderly.vn', { type: 'plan', shareToken: token }) : null;
  if (!token || !isSafeDeepLinkToken(token)) return <SafeAreaView style={styles.safe}><View style={styles.container}><Card><Text style={styles.title}>Liên kết không hợp lệ</Text><Text style={styles.body}>Token chia sẻ không đúng định dạng.</Text></Card></View></SafeAreaView>;
  return <SafeAreaView style={styles.safe}><View style={styles.container}><Card>
    <Text style={styles.eyebrow}>LỊCH TRÌNH ĐƯỢC CHIA SẺ</Text><Text style={styles.title}>Cùng khám phá với Wanderly</Text>
    <Text style={styles.body}>Mở bản đầy đủ trên web để xem lịch trình từ liên kết chia sẻ này.</Text>
    {webUrl && <Pressable onPress={() => void Linking.openURL(webUrl)} style={styles.primary}><Text style={styles.primaryText}>Mở lịch trình</Text></Pressable>}
    <Pressable onPress={() => router.replace('/')}><Text style={styles.secondary}>Về trang chủ</Text></Pressable>
  </Card></View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { backgroundColor: '#f4f7f2', flex: 1 }, container: { flex: 1, justifyContent: 'center', padding: 24 }, eyebrow: { color: '#277253', fontSize: 12, fontWeight: '700', letterSpacing: 1.5 }, title: { color: '#17231f', fontSize: 30, fontWeight: '700', marginTop: 12 }, body: { color: '#52615b', fontSize: 16, lineHeight: 24, marginTop: 14 }, primary: { backgroundColor: '#277253', borderRadius: 12, marginTop: 24, padding: 14 }, primaryText: { color: '#fff', fontWeight: '700', textAlign: 'center' }, secondary: { color: '#52615b', fontWeight: '700', marginTop: 18, textAlign: 'center' } });
