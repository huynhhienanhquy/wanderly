import { loginRequestSchema, type AuthResponse } from '@wanderly/contracts';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveAuthTokens } from '../../src/auth-storage';
import { mobileConfig } from '../../src/app-config';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    setMessage('');
    const parsed = loginRequestSchema.safeParse({ email, password });
    if (!parsed.success) {
      setMessage('Email hoặc mật khẩu không hợp lệ.');
      return;
    }
    setSubmitting(true);
    try {
      const response = await fetch(`${mobileConfig.apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      const body = (await response.json()) as
        | AuthResponse
        | { message?: string };
      if (!response.ok || !('tokens' in body)) {
        throw new Error(
          'message' in body ? body.message : 'Không thể đăng nhập.',
        );
      }
      await saveAuthTokens(body.tokens.accessToken, body.tokens.refreshToken);
      router.replace('/explore');
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : 'Không thể đăng nhập.',
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>WANDERLY</Text>
        <Text style={styles.title}>Đăng nhập</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        {message ? <Text style={styles.message}>{message}</Text> : null}
        <Pressable style={styles.button} disabled={submitting} onPress={submit}>
          <Text style={styles.buttonText}>
            {submitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#f4f7f2', flex: 1 },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 14,
  },
  eyebrow: {
    color: '#277253',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
  },
  title: {
    color: '#17231f',
    fontSize: 40,
    fontWeight: '700',
    marginBottom: 12,
  },
  input: {
    backgroundColor: 'white',
    borderColor: '#cad4cf',
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 16,
    padding: 14,
  },
  message: { color: '#52615b', lineHeight: 22 },
  button: {
    alignItems: 'center',
    backgroundColor: '#277253',
    borderRadius: 12,
    padding: 15,
  },
  buttonText: { color: 'white', fontSize: 16, fontWeight: '700' },
});
