import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearAuthTokens, getRefreshToken } from '../../src/auth-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';

export default function LogoutScreen() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    async function logout() {
      const refreshToken = await getRefreshToken();
      if (refreshToken) {
        await fetch(`${API_URL}/auth/logout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refreshToken }),
        }).catch(() => undefined);
      }
      await clearAuthTokens();
      setDone(true);
    }
    void logout();
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <Text style={styles.title}>
          {done ? 'Đã đăng xuất' : 'Đang đăng xuất...'}
        </Text>
        {done ? (
          <Link href="/login" style={styles.link}>
            Đăng nhập lại
          </Link>
        ) : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#f4f7f2', flex: 1 },
  card: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { color: '#17231f', fontSize: 36, fontWeight: '700' },
  link: { color: '#277253', fontSize: 17, fontWeight: '700', marginTop: 24 },
});
