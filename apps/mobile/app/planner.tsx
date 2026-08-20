import {
  candidateResponseSchema,
  extractConstraintsResponseSchema,
  type PlanningConstraints,
} from '@wanderly/contracts';
import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mobileConfig } from '../src/app-config';
import { saveMobilePlan } from '../src/plan-storage';
import { Button, Card } from '../src/ui';

function scheduleTime(index: number, startTime = '09:00') {
  const [hour = 9] = startTime.split(':').map(Number);
  return `${String(Math.min(hour + index * 2, 23)).padStart(2, '0')}:00`;
}

export default function PlannerScreen() {
  const [input, setInput] = useState('Một ngày cuối tuần cho 2 người, thích cà phê và chụp ảnh, ngân sách 1 triệu');
  const [constraints, setConstraints] = useState<PlanningConstraints | null>(null);
  const [peopleCount, setPeopleCount] = useState('2');
  const [budget, setBudget] = useState('');
  const [interests, setInterests] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function analyze() {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${mobileConfig.apiUrl}/ai/constraints`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input, timezone: Intl.DateTimeFormat().resolvedOptions().timeZone }),
      });
      if (!response.ok) throw new Error('Không thể phân tích yêu cầu.');
      const result = extractConstraintsResponseSchema.parse(await response.json());
      setConstraints(result.constraints);
      setPeopleCount(String(result.constraints.peopleCount));
      setBudget(result.constraints.budget === null ? '' : String(result.constraints.budget));
      setInterests(result.constraints.interests.join(', '));
      setWarnings(result.warnings);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  }

  async function generate() {
    if (!constraints) return;
    setLoading(true);
    setError('');
    try {
      const edited: PlanningConstraints = {
        ...constraints,
        peopleCount: Math.max(1, Number(peopleCount) || 1),
        budget: budget ? Math.max(0, Number(budget) || 0) : null,
        interests: interests.split(',').map((value) => value.trim()).filter(Boolean),
      };
      const response = await fetch(`${mobileConfig.apiUrl}/recommendations/candidates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ constraints: edited, limit: 6 }),
      });
      if (!response.ok) throw new Error('Không thể tạo kế hoạch lúc này.');
      const candidates = candidateResponseSchema.parse(await response.json()).data.slice(0, 4);
      if (candidates.length === 0) throw new Error('Chưa tìm thấy địa điểm phù hợp.');
      await saveMobilePlan({
        title: 'Lịch trình Wanderly AI',
        date: edited.date ?? new Date().toISOString().slice(0, 10),
        budget: edited.budget,
        peopleCount: edited.peopleCount,
        items: candidates.map(({ place }, index) => ({
          id: place.id,
          slug: place.slug,
          name: place.name,
          startTime: scheduleTime(index, edited.startTime),
          priceMin: place.priceMin,
          latitude: place.latitude,
          longitude: place.longitude,
        })),
      });
      router.replace('/plan');
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'Đã có lỗi xảy ra.');
    } finally {
      setLoading(false);
    }
  }

  return <SafeAreaView style={styles.safe}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Text style={styles.eyebrow}>WANDERLY AI</Text>
    <Text style={styles.title}>Bạn muốn đi đâu hôm nay?</Text>
    <TextInput multiline value={input} onChangeText={setInput} style={styles.prompt} accessibilityLabel="Mô tả chuyến đi" />
    {!constraints ? <Button onPress={analyze} disabled={loading || input.trim().length < 3}>Phân tích yêu cầu</Button> : <Card className="mt-5">
      <Text style={styles.sectionTitle}>Xác nhận tiêu chí</Text>
      <Text style={styles.label}>Số người</Text><TextInput value={peopleCount} onChangeText={setPeopleCount} keyboardType="number-pad" style={styles.input} />
      <Text style={styles.label}>Ngân sách (VND)</Text><TextInput value={budget} onChangeText={setBudget} keyboardType="number-pad" placeholder="Không giới hạn" style={styles.input} />
      <Text style={styles.label}>Sở thích (phân cách bằng dấu phẩy)</Text><TextInput value={interests} onChangeText={setInterests} style={styles.input} />
      <Button onPress={generate} disabled={loading}>Tạo lịch trình</Button>
      <Text onPress={() => setConstraints(null)} style={styles.reset}>Nhập lại mô tả</Text>
    </Card>}
    {loading && <ActivityIndicator color="#277253" style={styles.feedback} />}
    {warnings.map((warning) => <Text key={warning} style={styles.warning}>{warning}</Text>)}
    {!!error && <Text style={styles.error}>{error}</Text>}
  </ScrollView></SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#f4f7f2' }, container: { padding: 24 }, eyebrow: { color: '#277253', fontWeight: '700', letterSpacing: 2 },
  title: { color: '#17231f', fontSize: 38, fontWeight: '700', marginBottom: 24, marginTop: 12 }, prompt: { backgroundColor: '#fff', borderColor: '#d8e1dc', borderRadius: 16, borderWidth: 1, fontSize: 16, minHeight: 130, padding: 16, textAlignVertical: 'top', marginBottom: 16 },
  sectionTitle: { color: '#17231f', fontSize: 22, fontWeight: '700', marginBottom: 16 }, label: { color: '#52615b', fontWeight: '600', marginBottom: 6 }, input: { borderColor: '#d8e1dc', borderRadius: 10, borderWidth: 1, marginBottom: 14, padding: 12 }, reset: { color: '#52615b', textAlign: 'center', marginTop: 16 }, feedback: { marginTop: 20 }, warning: { color: '#8a5a00', marginTop: 12 }, error: { color: '#9d2922', marginTop: 12 },
});
