import {
  fetchPlacePage,
  formatPlacePrice,
  type PlaceSummary,
} from '@wanderly/contracts';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import { mobileConfig } from '../../src/app-config';

function PlaceCard({ place }: { place: PlaceSummary }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageFallback}>
        <Text style={styles.imageLetter}>W</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.meta}>
          <Text style={styles.metaText}>{place.district ?? place.city}</Text>
          <Text style={styles.metaText}>
            ★ {place.rating?.toFixed(1) ?? 'Mới'}
          </Text>
        </View>
        <Text style={styles.cardTitle}>{place.name}</Text>
        <Text style={styles.cardDescription} numberOfLines={2}>
          {place.description ?? place.address}
        </Text>
        <Text style={styles.price}>
          {formatPlacePrice(place.priceMin, place.priceMax)}
        </Text>
      </View>
    </View>
  );
}

export default function ExploreScreen() {
  const [places, setPlaces] = useState<PlaceSummary[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState('');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  async function load(nextCursor?: string | null) {
    if (nextCursor) setLoadingMore(true);
    else setLoading(true);
    setError('');
    try {
      const page = await fetchPlacePage(mobileConfig.apiUrl, {
        cursor: nextCursor,
        limit: 10,
        q: query.trim() || undefined,
        category: category.trim() || undefined,
      });
      setPlaces((current) =>
        nextCursor ? [...current, ...page.data] : page.data,
      );
      setCursor(page.nextCursor);
    } catch (caught) {
      setError(
        caught instanceof Error ? caught.message : 'Không thể tải địa điểm.',
      );
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }
  useEffect(() => {
    void load();
  }, []);
  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        contentContainerStyle={styles.content}
        data={places}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <Link
            href={{ pathname: '/places/[slug]', params: { slug: item.slug } }}
            asChild
          >
            <Pressable>
              <PlaceCard place={item} />
            </Pressable>
          </Link>
        )}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.eyebrow}>WANDERLY EXPLORE</Text>
            <Text style={styles.title}>Đi đâu hôm nay?</Text>
            <Text style={styles.subtitle}>Những gợi ý vừa vặn với bạn.</Text>
            <TextInput accessibilityLabel="Tìm kiếm địa điểm" style={styles.input} value={query} onChangeText={setQuery} placeholder="Tên hoặc khu vực" returnKeyType="search" onSubmitEditing={() => void load()} />
            <TextInput accessibilityLabel="Lọc theo danh mục" style={styles.input} value={category} onChangeText={setCategory} placeholder="Danh mục: cafe, food…" returnKeyType="search" onSubmitEditing={() => void load()} />
            <Pressable style={styles.filterButton} onPress={() => void load()}><Text style={styles.buttonText}>Tìm và lọc</Text></Pressable>
          </View>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator color="#277253" size="large" />
          ) : (
            <Text style={styles.state}>{error || 'Chưa có địa điểm nào.'}</Text>
          )
        }
        ListFooterComponent={
          cursor ? (
            <Pressable
              style={styles.button}
              disabled={loadingMore}
              onPress={() => void load(cursor)}
            >
              <Text style={styles.buttonText}>
                {loadingMore ? 'Đang tải…' : 'Xem thêm'}
              </Text>
            </Pressable>
          ) : null
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#f4f7f2', flex: 1 },
  content: { padding: 20, paddingBottom: 48 },
  header: { marginBottom: 24 },
  eyebrow: {
    color: '#277253',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.8,
  },
  title: {
    color: '#17231f',
    fontSize: 42,
    fontWeight: '700',
    letterSpacing: -1.5,
    marginTop: 8,
  },
  subtitle: { color: '#52615b', fontSize: 17, marginTop: 10 },
  input: { backgroundColor: 'white', borderColor: '#dce5df', borderWidth: 1, borderRadius: 12, marginTop: 12, padding: 13 },
  filterButton: { alignItems: 'center', backgroundColor: '#277253', borderRadius: 12, marginTop: 10, padding: 12 },
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 16,
    overflow: 'hidden',
  },
  imageFallback: {
    alignItems: 'center',
    aspectRatio: 16 / 7,
    backgroundColor: '#dcece4',
    justifyContent: 'center',
  },
  imageLetter: { color: '#277253', fontSize: 40, fontWeight: '800' },
  cardBody: { padding: 16 },
  meta: { flexDirection: 'row', justifyContent: 'space-between' },
  metaText: { color: '#607069', fontSize: 13 },
  cardTitle: {
    color: '#17231f',
    fontSize: 21,
    fontWeight: '700',
    marginTop: 8,
  },
  cardDescription: { color: '#52615b', lineHeight: 21, marginTop: 7 },
  price: { color: '#277253', fontWeight: '700', marginTop: 12 },
  state: { color: '#52615b', padding: 24, textAlign: 'center' },
  button: {
    alignItems: 'center',
    backgroundColor: '#277253',
    borderRadius: 12,
    marginTop: 8,
    padding: 14,
  },
  buttonText: { color: 'white', fontWeight: '700' },
});
