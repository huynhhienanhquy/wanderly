import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';
import { MapCanvas } from '../../src/map-canvas';

export default function MapScreen() {
  const params = useLocalSearchParams<{ latitude?: string; longitude?: string; name?: string; points?: string }>();
  const latitude = Number(params.latitude ?? 21.0285);
  const longitude = Number(params.longitude ?? 105.8542);
  const [current, setCurrent] = useState<{ latitude: number; longitude: number; label: string } | null>(null);
  const [message, setMessage] = useState('');
  let route: Array<{ latitude: number; longitude: number; name?: string }> = [];
  try { route = params.points ? JSON.parse(params.points) as typeof route : []; } catch { route = []; }
  async function locate() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== 'granted') { setMessage('Bạn đã từ chối quyền vị trí. Có thể bật lại trong Cài đặt.'); return; }
    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const addresses = await Location.reverseGeocodeAsync(position.coords);
    const address = addresses[0];
    setCurrent({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: [address?.name, address?.district, address?.city].filter(Boolean).join(', ') || 'Vị trí hiện tại' });
  }
  const markers = route.length > 0 ? route : [{ latitude, longitude, name: params.name }];
  return <View style={styles.container}><MapCanvas markers={markers} current={current} /><Text onPress={() => void locate()} style={styles.button}>Dùng vị trí của tôi</Text><Text style={styles.caption}>{message || current?.label || params.name || 'Bản đồ Wanderly'}</Text></View>;
}
const styles = StyleSheet.create({ container: { flex: 1 }, button: { backgroundColor: '#277253', color: 'white', padding: 14, textAlign: 'center', fontWeight: '700' }, caption: { backgroundColor: 'white', padding: 16, fontSize: 16, fontWeight: '600' } });
