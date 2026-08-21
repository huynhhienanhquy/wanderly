import { reviewSchema } from '@wanderly/contracts';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { mobileConfig } from '../src/app-config';

export default function ReviewsScreen() {
  const { placeId } = useLocalSearchParams<{ placeId?: string }>(); const [reviews, setReviews] = useState<ReturnType<typeof reviewSchema.parse>[]>([]); const [error, setError] = useState('');
  useEffect(() => { if (!placeId) return; fetch(`${mobileConfig.apiUrl}/places/${placeId}/reviews`).then(async (response) => { if (!response.ok) throw new Error('Không thể tải đánh giá.'); return (await response.json() as unknown[]).map((value) => reviewSchema.parse(value)); }).then(setReviews).catch((cause: unknown) => setError(cause instanceof Error ? cause.message : 'Không thể tải đánh giá.')); }, [placeId]);
  return <SafeAreaView style={styles.safe}><View style={styles.container}><Text style={styles.title}>Đánh giá địa điểm</Text>{!reviews.length && !error && <ActivityIndicator color="#277253" />}{!!error && <Text style={styles.error}>{error}</Text>}{reviews.map((review) => <View key={review.id} style={styles.card}><Text style={styles.rating}>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</Text><Text style={styles.content}>{review.content ?? 'Không có nội dung.'}</Text><Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString('vi-VN')}</Text></View>)}</View></SafeAreaView>;
}
const styles = StyleSheet.create({ safe: { backgroundColor: '#f4f7f2', flex: 1 }, container: { padding: 24 }, title: { color: '#17231f', fontSize: 32, fontWeight: '700', marginBottom: 20 }, error: { color: '#9d2922' }, card: { backgroundColor: '#fff', borderRadius: 14, marginTop: 12, padding: 16 }, rating: { color: '#c17a00', fontSize: 18 }, content: { color: '#17231f', marginTop: 8 }, date: { color: '#718078', fontSize: 12, marginTop: 10 } });
