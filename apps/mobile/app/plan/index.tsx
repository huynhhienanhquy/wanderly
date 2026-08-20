import { Link, router, useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getMobilePlan, saveMobilePlan, type MobilePlan } from '../../src/plan-storage';
import { Card } from '../../src/ui';
import { SmartReplaceSheet } from '../../src/smart-replace-sheet';
import { schedulePlanReminder } from '../../src/notifications';

const formatMoney = (value: number) => `${value.toLocaleString('vi-VN')}đ`;

export default function PlanScreen() {
  const [plan, setPlan] = useState<MobilePlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [replacingId, setReplacingId] = useState<string | null>(null);
  const [reminderMessage, setReminderMessage] = useState('');
  useFocusEffect(useCallback(() => {
    let active = true;
    getMobilePlan().then((saved) => { if (active) { setPlan(saved); setLoading(false); } });
    return () => { active = false; };
  }, []));

  async function removeItem(id: string) {
    if (!plan) return;
    const updated = { ...plan, items: plan.items.filter((item) => item.id !== id) };
    setPlan(updated);
    await saveMobilePlan(updated);
  }

  async function sharePlan() {
    if (!plan) return;
    const timeline = plan.items.map((item) => `${item.startTime} — ${item.name}`).join('\n');
    await Share.share({ message: `${plan.title} (${plan.date})\n${timeline}\n\nTạo bởi Wanderly` });
  }

  function openMap() {
    if (!plan) return;
    router.push({ pathname: '/map', params: { points: JSON.stringify(plan.items.map(({ latitude, longitude, name }) => ({ latitude, longitude, name }))) } });
  }

  async function replaceItem(replacement: MobilePlan['items'][number]) {
    if (!plan || !replacingId) return;
    const current = plan.items.find((item) => item.id === replacingId);
    const updated = { ...plan, items: plan.items.map((item) => item.id === replacingId ? { ...replacement, startTime: current?.startTime ?? replacement.startTime } : item) };
    setPlan(updated); setReplacingId(null); await saveMobilePlan(updated);
  }

  async function remindMe() {
    if (!plan) return;
    try { const date = await schedulePlanReminder(plan.title, plan.date); setReminderMessage(`Đã đặt lời nhắc lúc ${date.toLocaleString('vi-VN')}.`); }
    catch (cause) { setReminderMessage(cause instanceof Error ? cause.message : 'Không thể đặt lời nhắc.'); }
  }

  if (loading) return <SafeAreaView style={styles.safe}><ActivityIndicator color="#277253" style={styles.loader} /></SafeAreaView>;
  if (!plan) return <SafeAreaView style={styles.safe}><View style={styles.empty}><Card>
    <Text style={styles.title}>Kế hoạch của bạn</Text><Text style={styles.body}>Tạo lịch trình bằng Wanderly AI để bắt đầu.</Text>
    <Link href="/planner" style={styles.link}>Tạo kế hoạch</Link>
  </Card></View></SafeAreaView>;

  const estimatedCost = plan.items.reduce((total, item) => total + (item.priceMin ?? 0), 0) * plan.peopleCount;
  return <SafeAreaView style={styles.safe}><FlatList data={plan.items} keyExtractor={(item) => item.id} contentContainerStyle={styles.container}
    ListHeaderComponent={<View style={styles.header}><Text style={styles.eyebrow}>{plan.date} · {plan.peopleCount} người</Text><Text style={styles.title}>{plan.title}</Text>
      <Card className="mt-4"><Text style={styles.budgetLabel}>Chi phí dự kiến</Text><Text style={styles.budget}>{formatMoney(estimatedCost)}</Text><Text style={styles.body}>Ngân sách: {plan.budget === null ? 'không giới hạn' : formatMoney(plan.budget)}</Text></Card></View>}
    renderItem={({ item, index }) => <View style={styles.row}><View style={styles.rail}><View style={styles.dot} />{index < plan.items.length - 1 && <View style={styles.line} />}</View>
      <View style={styles.item}><Text style={styles.time}>{item.startTime}</Text><Text style={styles.place}>{item.name}</Text><View style={styles.actions}><Link href={`/places/${item.slug}`} style={styles.link}>Chi tiết</Link><Pressable onPress={() => setReplacingId(item.id)}><Text style={styles.replace}>Thay thế</Text></Pressable><Pressable onPress={() => removeItem(item.id)}><Text style={styles.remove}>Xóa</Text></Pressable></View></View></View>}
    ListFooterComponent={<View style={styles.footer}><Pressable onPress={openMap} style={styles.mapButton}><Text style={styles.mapText}>Xem toàn bộ tuyến đường</Text></Pressable><Pressable onPress={remindMe} style={styles.mapButton}><Text style={styles.mapText}>Nhắc tôi trước chuyến đi</Text></Pressable>{!!reminderMessage && <Text style={styles.reminder}>{reminderMessage}</Text>}<Pressable onPress={sharePlan} style={styles.share}><Text style={styles.shareText}>Chia sẻ lịch trình</Text></Pressable><Link href="/planner" style={styles.link}>Tạo lịch trình mới</Link></View>} />
    <SmartReplaceSheet visible={replacingId !== null} currentId={replacingId} peopleCount={plan.peopleCount} budget={plan.budget} onClose={() => setReplacingId(null)} onReplace={replaceItem} />
  </SafeAreaView>;
}

const styles = StyleSheet.create({
  safe: { backgroundColor: '#f4f7f2', flex: 1 }, loader: { flex: 1 }, empty: { flex: 1, justifyContent: 'center', padding: 24 }, container: { padding: 24 }, header: { marginBottom: 24 }, eyebrow: { color: '#277253', fontWeight: '700', letterSpacing: 1 }, title: { color: '#17231f', fontSize: 34, fontWeight: '700', marginTop: 8 }, body: { color: '#52615b', fontSize: 16, lineHeight: 24, marginTop: 8 }, budgetLabel: { color: '#52615b' }, budget: { color: '#17231f', fontSize: 28, fontWeight: '700', marginTop: 4 },
  row: { flexDirection: 'row', minHeight: 112 }, rail: { alignItems: 'center', marginRight: 16, width: 18 }, dot: { backgroundColor: '#277253', borderRadius: 9, height: 18, width: 18 }, line: { backgroundColor: '#b9cec3', flex: 1, width: 2 }, item: { backgroundColor: '#fff', borderColor: '#d8e1dc', borderRadius: 14, borderWidth: 1, flex: 1, marginBottom: 14, padding: 16 }, time: { color: '#277253', fontWeight: '700' }, place: { color: '#17231f', fontSize: 18, fontWeight: '700', marginTop: 4 }, actions: { flexDirection: 'row', gap: 20, marginTop: 12 }, link: { color: '#277253', fontWeight: '700', marginTop: 12 }, replace: { color: '#277253', fontWeight: '600', marginTop: 12 }, remove: { color: '#9d2922', fontWeight: '600', marginTop: 12 }, footer: { alignItems: 'center', paddingBottom: 24 }, mapButton: { borderColor: '#277253', borderRadius: 12, borderWidth: 1, marginBottom: 12, padding: 13, width: '100%' }, mapText: { color: '#277253', fontWeight: '700', textAlign: 'center' }, reminder: { color: '#52615b', marginBottom: 12 }, share: { backgroundColor: '#277253', borderRadius: 12, paddingHorizontal: 24, paddingVertical: 14, width: '100%' }, shareText: { color: '#fff', fontWeight: '700', textAlign: 'center' },
});
