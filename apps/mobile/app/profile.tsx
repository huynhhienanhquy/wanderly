import { profileSchema } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mobileApiClient } from '../src/api-client';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<ReturnType<typeof profileSchema.parse> | null>(null); const [name, setName] = useState(''); const [message, setMessage] = useState(''); const [loading, setLoading] = useState(true);
  useEffect(() => { mobileApiClient.request('profile', { method: 'GET', schema: profileSchema }).then((value) => { setProfile(value); setName(value.displayName); }).catch((cause: unknown) => setMessage(cause instanceof Error ? cause.message : 'Không thể tải hồ sơ.')).finally(() => setLoading(false)); }, []);
  async function save() { setMessage(''); try { const value = await mobileApiClient.request('profile', { method: 'PATCH', body: { displayName: name }, schema: profileSchema }); setProfile(value); setMessage('Đã lưu hồ sơ.'); } catch (cause) { setMessage(cause instanceof Error ? cause.message : 'Không thể lưu hồ sơ.'); } }
  if (loading) return <SafeAreaView style={styles.safe}><ActivityIndicator color="#277253" style={styles.loader} /></SafeAreaView>;
  return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Hồ sơ cá nhân</Text><Text style={styles.label}>Email</Text><Text style={styles.value}>{profile?.email ?? 'Chưa đăng nhập'}</Text><Text style={styles.label}>Tên hiển thị</Text><TextInput value={name} onChangeText={setName} style={styles.input} /><Pressable onPress={() => void save()} style={styles.button}><Text style={styles.buttonText}>Lưu thay đổi</Text></Pressable>{!!message && <Text style={styles.message}>{message}</Text>}</View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { backgroundColor: '#f4f7f2', flex: 1 }, container: { padding: 24 }, loader: { flex: 1 }, title: { color: '#17231f', fontSize: 34, fontWeight: '700', marginBottom: 24 }, label: { color: '#52615b', fontWeight: '700', marginTop: 16 }, value: { color: '#17231f', fontSize: 16, marginTop: 8 }, input: { backgroundColor: '#fff', borderColor: '#d8e1dc', borderRadius: 12, borderWidth: 1, marginTop: 8, padding: 14 }, button: { backgroundColor: '#277253', borderRadius: 12, marginTop: 24, padding: 14 }, buttonText: { color: '#fff', fontWeight: '700', textAlign: 'center' }, message: { color: '#52615b', marginTop: 14 } });
