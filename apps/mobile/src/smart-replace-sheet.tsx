import { candidateResponseSchema, type RankedCandidate } from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { mobileConfig } from './app-config';
import type { MobilePlanItem } from './plan-storage';

export function SmartReplaceSheet({ visible, currentId, peopleCount, budget, onClose, onReplace }: { visible: boolean; currentId: string | null; peopleCount: number; budget: number | null; onClose: () => void; onReplace: (item: MobilePlanItem) => void }) {
  const [items, setItems] = useState<RankedCandidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  useEffect(() => {
    if (!visible) return;
    setLoading(true); setError('');
    fetch(`${mobileConfig.apiUrl}/recommendations/candidates`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ constraints: { peopleCount, budget, currency: 'VND', interests: [], excludedCategories: [], travelMode: 'DRIVE', notes: null }, limit: 8 }) })
      .then(async (response) => { if (!response.ok) throw new Error('Không thể tải gợi ý thay thế.'); return candidateResponseSchema.parse(await response.json()).data; })
      .then((data) => setItems(data.filter(({ place }) => place.id !== currentId).slice(0, 4)))
      .catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Đã có lỗi xảy ra.'))
      .finally(() => setLoading(false));
  }, [budget, currentId, peopleCount, visible]);
  return <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}><Pressable style={styles.backdrop} onPress={onClose}><Pressable style={styles.sheet} onPress={() => undefined}>
    <View style={styles.handle} /><Text style={styles.title}>Thay địa điểm thông minh</Text><Text style={styles.subtitle}>Các lựa chọn phù hợp với ngân sách hiện tại.</Text>
    {loading && <ActivityIndicator color="#277253" />} {!!error && <Text style={styles.error}>{error}</Text>}
    <ScrollView>{items.map(({ place, reason }) => <View key={place.id} style={styles.item}><View style={styles.copy}><Text style={styles.name}>{place.name}</Text><Text style={styles.reason}>{reason}</Text></View><Pressable onPress={() => onReplace({ id: place.id, slug: place.slug, name: place.name, startTime: '', priceMin: place.priceMin, latitude: place.latitude, longitude: place.longitude })} style={styles.choose}><Text style={styles.chooseText}>Chọn</Text></Pressable></View>)}</ScrollView>
    <Pressable onPress={onClose}><Text style={styles.close}>Đóng</Text></Pressable>
  </Pressable></Pressable></Modal>;
}
const styles = StyleSheet.create({ backdrop: { backgroundColor: 'rgba(0,0,0,.35)', flex: 1, justifyContent: 'flex-end' }, sheet: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, maxHeight: '75%', padding: 24 }, handle: { alignSelf: 'center', backgroundColor: '#cad4cf', borderRadius: 2, height: 4, marginBottom: 18, width: 44 }, title: { color: '#17231f', fontSize: 24, fontWeight: '700' }, subtitle: { color: '#52615b', marginBottom: 18, marginTop: 6 }, item: { borderBottomColor: '#e1e7e4', borderBottomWidth: 1, flexDirection: 'row', paddingVertical: 16 }, copy: { flex: 1 }, name: { color: '#17231f', fontSize: 17, fontWeight: '700' }, reason: { color: '#52615b', marginTop: 4 }, choose: { alignSelf: 'center', backgroundColor: '#e6f2ec', borderRadius: 10, padding: 10 }, chooseText: { color: '#18563d', fontWeight: '700' }, close: { color: '#52615b', fontWeight: '700', paddingTop: 18, textAlign: 'center' }, error: { color: '#9d2922', marginBottom: 12 } });
