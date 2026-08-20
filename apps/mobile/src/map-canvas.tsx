import { Linking, StyleSheet, Text, View } from 'react-native';
export type MapMarker = { latitude: number; longitude: number; name?: string; label?: string };
export function MapCanvas({ markers, current }: { markers: MapMarker[]; current: MapMarker | null }) {
  const points = current ? [...markers, current] : markers;
  const url = points.length ? `https://www.google.com/maps/dir/?api=1&destination=${points.at(-1)!.latitude},${points.at(-1)!.longitude}&waypoints=${points.slice(0, -1).map(({ latitude, longitude }) => `${latitude},${longitude}`).join('|')}` : '';
  return <View style={styles.fallback}><Text style={styles.title}>Bản đồ khả dụng trên Android/iOS.</Text>{url && <Text style={styles.link} onPress={() => void Linking.openURL(url)}>Mở tuyến đường trong Google Maps</Text>}</View>;
}
const styles = StyleSheet.create({ fallback: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 }, title: { fontSize: 18, marginBottom: 16 }, link: { color: '#277253', fontWeight: '700' } });
