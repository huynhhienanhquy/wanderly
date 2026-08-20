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
import { mobileConfig } from '../../src/app-config';
import { getFavoritePlaceIds, toggleFavoritePlace } from '../../src/favorite-storage';
export default function PlaceDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [place, setPlace] = useState<PlaceDetail | null>(null);
  const [error, setError] = useState('');
  const [favorite, setFavorite] = useState(false);
  useEffect(() => {
    if (slug)
      void fetchPlaceDetail(mobileConfig.apiUrl, slug)
        .then(async (data) => { setPlace(data); setFavorite((await getFavoritePlaceIds()).includes(data.id)); })
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
              <Pressable accessibilityRole="button" style={styles.favorite} onPress={() => void toggleFavoritePlace(place.id).then(setFavorite)}><Text style={styles.favoriteText}>{favorite ? '♥ Đã lưu' : '♡ Lưu địa điểm'}</Text></Pressable>
              <Pressable onPress={() => router.push({ pathname: '/map', params: { latitude: String(place.latitude), longitude: String(place.longitude), name: place.name } })}><Text style={styles.mapLink}>Xem trên bản đồ</Text></Pressable>
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
  mapLink: { color: '#277253', fontWeight: '700', marginTop: 16 },
  favorite: { borderColor: '#277253', borderWidth: 1, borderRadius: 12, marginTop: 16, padding: 12, alignItems: 'center' },
  favoriteText: { color: '#277253', fontWeight: '700' },
  state: { color: '#52615b', paddingVertical: 48, textAlign: 'center' },
});
