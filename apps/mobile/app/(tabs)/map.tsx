import { useLocalSearchParams } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useState } from 'react';
import { MapCanvas } from '../../src/map-canvas';

export default function MapScreen() {
  const params = useLocalSearchParams<{ latitude?: string; longitude?: string; name?: string; points?: string }>();
  const latitude = Number(params.latitude ?? 21.0285);
  const longitude = Number(params.longitude ?? 105.8542);
  const [current, setCurrent] = useState<{ latitude: number; longitude: number; label: string } | null>(null);
  const [message, setMessage] = useState('');
  const [locating, setLocating] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);
  let route: Array<{ latitude: number; longitude: number; name?: string }> = [];
  try { route = params.points ? JSON.parse(params.points) as typeof route : []; } catch { route = []; }
  async function locate() {
    try {
      setLocating(true); setMessage(''); setOpenSettings(false);
      const permission = await Location.requestForegroundPermissionsAsync();
      if (permission.status !== 'granted') {
        setOpenSettings(!permission.canAskAgain);
        setMessage(permission.canAskAgain ? 'Wanderly cần quyền vị trí để tìm địa điểm gần bạn.' : 'Quyền vị trí đang bị tắt. Hãy bật lại trong Cài đặt.');
        return;
      }
      const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
      const addresses = await Location.reverseGeocodeAsync(position.coords);
      const address = addresses[0];
      setCurrent({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: [address?.name, address?.district, address?.city].filter(Boolean).join(', ') || 'Vị trí hiện tại' });
    } catch {
      setMessage('Không thể lấy vị trí hiện tại. Hãy kiểm tra GPS và thử lại.');
    } finally {
      setLocating(false);
    }
  }
  const markers = route.length > 0 ? route : [{ latitude, longitude, name: params.name }];
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${markers.at(-1)!.latitude},${markers.at(-1)!.longitude}&waypoints=${markers.slice(0, -1).map((point) => `${point.latitude},${point.longitude}`).join('|')}`;
  return <View style={styles.container}><MapCanvas markers={markers} current={current} />
    <Pressable accessibilityRole="button" disabled={locating} onPress={() => void locate()} style={styles.button}><Text style={styles.buttonText}>{locating ? 'Đang xác định vị trí…' : 'Dùng vị trí của tôi'}</Text></Pressable>
    <Pressable accessibilityRole="link" onPress={() => void Linking.openURL(directionsUrl)} style={styles.directions}><Text style={styles.directionsText}>Dẫn đường bằng Google Maps</Text></Pressable>
    {openSettings && <Pressable accessibilityRole="button" onPress={() => void Linking.openSettings()} style={styles.settings}><Text style={styles.settingsText}>Mở Cài đặt</Text></Pressable>}
    <Text accessibilityLiveRegion="polite" style={styles.caption}>{message || current?.label || params.name || 'Bản đồ Wanderly'}</Text>
  </View>;
}
const styles = StyleSheet.create({ container: { flex: 1 }, button: { backgroundColor: '#277253', padding: 14, alignItems: 'center' }, buttonText: { color: 'white', fontWeight: '700' }, directions: { backgroundColor: '#e6f2ec', padding: 12, alignItems: 'center' }, directionsText: { color: '#18563d', fontWeight: '700' }, settings: { backgroundColor: '#fff3db', padding: 12, alignItems: 'center' }, settingsText: { color: '#7a4b00', fontWeight: '700' }, caption: { backgroundColor: 'white', padding: 16, fontSize: 16, fontWeight: '600' } });
