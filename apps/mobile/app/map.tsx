import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useState } from 'react';

export default function MapScreen() {
  const params = useLocalSearchParams<{ latitude?: string; longitude?: string; name?: string }>();
  const latitude = Number(params.latitude ?? 21.0285);
  const longitude = Number(params.longitude ?? 105.8542);
  const [current, setCurrent] = useState<{ latitude: number; longitude: number; label: string } | null>(null);
  const [message, setMessage] = useState('');
  async function locate() {
    const permission = await Location.requestForegroundPermissionsAsync();
    if (permission.status !== 'granted') { setMessage('Bạn đã từ chối quyền vị trí. Có thể bật lại trong Cài đặt.'); return; }
    const position = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
    const addresses = await Location.reverseGeocodeAsync(position.coords);
    const address = addresses[0];
    setCurrent({ latitude: position.coords.latitude, longitude: position.coords.longitude, label: [address?.name, address?.district, address?.city].filter(Boolean).join(', ') || 'Vị trí hiện tại' });
  }
  return <View style={styles.container}><MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{ latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }}><Marker coordinate={{ latitude, longitude }} title={params.name ?? 'Wanderly'} />{current && <Marker coordinate={current} title={current.label} pinColor="#277253" />}</MapView><Text onPress={() => void locate()} style={styles.button}>Dùng vị trí của tôi</Text><Text style={styles.caption}>{message || current?.label || params.name || 'Bản đồ Wanderly'}</Text></View>;
}
const styles = StyleSheet.create({ container: { flex: 1 }, map: { flex: 1 }, button: { backgroundColor: '#277253', color: 'white', padding: 14, textAlign: 'center', fontWeight: '700' }, caption: { backgroundColor: 'white', padding: 16, fontSize: 16, fontWeight: '600' } });
