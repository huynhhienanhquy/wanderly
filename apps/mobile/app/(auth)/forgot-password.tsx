import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  async function submit() {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000'}/auth/forgot-password`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      },
    );
    const body = (await response.json()) as { message?: string };
    setMessage(body.message ?? 'Kiểm tra email để tiếp tục.');
  }
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Quên mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <Pressable style={styles.button} onPress={submit}>
          <Text style={styles.buttonText}>Gửi hướng dẫn</Text>
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
