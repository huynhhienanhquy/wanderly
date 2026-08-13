import {
  fetchPlaceDetail,
  formatPlacePrice,
  type PlaceDetail,
} from '@wanderly/contracts';
import { useLocalSearchParams, router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:4000';
export default function PlaceDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [error, setError] = useState('');
  useEffect(() => {
    if (slug)
      void fetchPlaceDetail(API_URL, slug)
        .then(setPlace)
        .catch((e) =>
          setError(e instanceof Error ? e.message : 'Không thể tải địa điểm.'),
        );
  }, [slug]);
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.back}>← Khám phá</Text>
        </Pressable>
        {!place && !error && <ActivityIndicator color="#277253" />}
        {error ? (
          <Text style={styles.state}>{error}</Text>
        ) : (
          place && (
            <>
              <Text style={styles.eyebrow}>{place.district ?? place.city}</Text>
              <Text style={styles.title}>{place.name}</Text>
              <Text style={styles.kpi}>
                ★ {place.rating?.toFixed(1) ?? 'Mới'} ·{' '}
                {formatPlacePrice(place.priceMin, place.priceMax)}
              </Text>
              <Text style={styles.address}>
                {place.address} · {place.city}
              </Text>
              {place.description && (
                <Text style={styles.description}>{place.description}</Text>
              )}
              <Text style={styles.heading}>Danh mục</Text>
              <Text style={styles.description}>
                {place.categories.map((c) => c.name).join(' · ') ||
                  'Chưa cập nhật'}
              </Text>
              <Text style={styles.heading}>Giờ mở cửa</Text>
              {place.openingHours.map((h) => (
                <Text style={styles.row} key={h.dayOfWeek}>
                  Ngày {h.dayOfWeek}:{' '}
                  {h.isClosed
                    ? 'Đóng cửa'
                    : `${h.open ?? ''} – ${h.close ?? ''}`}
                </Text>
              ))}
            </>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { backgroundColor: '#f4f7f2', flex: 1 },
  content: { padding: 20, paddingBottom: 56 },
  back: { color: '#277253', fontWeight: '700', marginBottom: 28 },
  eyebrow: { color: '#277253', fontWeight: '700', letterSpacing: 1.5 },
  title: {
    color: '#17231f',
    fontSize: 38,
    fontWeight: '700',
    marginVertical: 10,
  },
  kpi: { color: '#277253', fontWeight: '700' },
  address: { color: '#52615b', fontSize: 16, marginTop: 16 },
  description: {
    color: '#52615b',
    fontSize: 16,
    lineHeight: 24,
    marginTop: 16,
  },
  heading: {
    borderTopColor: '#dce5df',
    borderTopWidth: 1,
    color: '#17231f',
    fontSize: 20,
    fontWeight: '700',
    marginTop: 28,
    paddingTop: 20,
  },
  row: { color: '#52615b', paddingTop: 8 },
  state: { color: '#52615b', paddingVertical: 48, textAlign: 'center' },
});
