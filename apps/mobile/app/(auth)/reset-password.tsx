import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ResetPasswordScreen() {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  async function submit() {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000'}/auth/reset-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      },
    );
    setMessage(
      response.ok
        ? 'Mật khẩu đã được cập nhật.'
        : 'Token không hợp lệ hoặc đã hết hạn.',
    );
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Đặt lại mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Reset token"
          value={token}
          onChangeText={setToken}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu mới"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Cập nhật</Text>
        </Pressable>
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
