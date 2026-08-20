import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getFavoritePlaceIds, toggleFavoritePlace } from '../src/favorite-storage';

export default function FavoritesScreen() {
  const [ids, setIds] = useState<string[]>([]);
  useFocusEffect(useCallback(() => { getFavoritePlaceIds().then(setIds); }, []));
  async function remove(id: string) { await toggleFavoritePlace(id); setIds((current) => current.filter((value) => value !== id)); }
  return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Địa điểm đã lưu</Text>{ids.length === 0 ? <Text style={styles.body}>Bạn chưa lưu địa điểm nào. Hãy nhấn biểu tượng yêu thích ở trang chi tiết.</Text> : ids.map((id) => <View key={id} style={styles.row}><Text style={styles.id}>{id}</Text><Pressable onPress={() => void remove(id)}><Text style={styles.remove}>Bỏ lưu</Text></Pressable></View>)}</View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { backgroundColor: '#f4f7f2', flex: 1 }, container: { padding: 24 }, title: { color: '#17231f', fontSize: 34, fontWeight: '700' }, body: { color: '#52615b', fontSize: 16, lineHeight: 24, marginTop: 16 }, row: { alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, flexDirection: 'row', justifyContent: 'space-between', marginTop: 12, padding: 16 }, id: { color: '#17231f', flex: 1, fontSize: 12 }, remove: { color: '#9d2922', fontWeight: '700' } });
