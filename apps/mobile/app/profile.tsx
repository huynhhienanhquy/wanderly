import type { Profile } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAccessToken } from '../src/auth-storage';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';
export default function ProfileScreen() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  useEffect(() => {
    void (async () => {
      const accessToken = await getAccessToken();
      const response = await fetch(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      if (!response.ok) {
        setMessage('Vui lòng đăng nhập.');
        return;
      }
      const data = (await response.json()) as Profile;
      setProfile(data);
      setName(data.displayName);
      setPhone(data.phone ?? '');
    })();
  }, []);
  async function save() {
    const accessToken = await getAccessToken();
    const response = await fetch(`${API_URL}/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ displayName: name, phone: phone || null }),
    });
    setMessage(response.ok ? 'Đã cập nhật hồ sơ.' : 'Không thể cập nhật.');
    if (response.ok) setProfile((await response.json()) as Profile);
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Hồ sơ cá nhân</Text>
        {profile ? (
          <>
            <Text>{profile.email}</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="Số điện thoại"
            />
            <Pressable style={styles.button} onPress={save}>
              <Text style={styles.buttonText}>Lưu thay đổi</Text>
            </Pressable>
          </>
        ) : null}
        {message ? <Text>{message}</Text> : null}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f7f2' },
  container: { flex: 1, justifyContent: 'center', padding: 24, gap: 14 },
  title: { fontSize: 36, fontWeight: '700' },
  input: { backgroundColor: 'white', padding: 14, borderRadius: 12 },
  button: { backgroundColor: '#277253', padding: 15, borderRadius: 12 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: '700' },
});
