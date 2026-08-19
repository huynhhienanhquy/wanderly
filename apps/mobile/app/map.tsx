import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen() {
  const params = useLocalSearchParams<{ latitude?: string; longitude?: string; name?: string }>();
  const latitude = Number(params.latitude ?? 21.0285);
  const longitude = Number(params.longitude ?? 105.8542);
  return <View style={styles.container}><MapView provider={PROVIDER_GOOGLE} style={styles.map} initialRegion={{ latitude, longitude, latitudeDelta: 0.02, longitudeDelta: 0.02 }}><Marker coordinate={{ latitude, longitude }} title={params.name ?? 'Wanderly'} /></MapView><Text style={styles.caption}>{params.name ?? 'Bản đồ Wanderly'}</Text></View>;
}
const styles = StyleSheet.create({ container: { flex: 1 }, map: { flex: 1 }, caption: { backgroundColor: 'white', padding: 16, fontSize: 16, fontWeight: '600' } });
