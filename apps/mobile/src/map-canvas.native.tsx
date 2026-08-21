import { useEffect, useRef } from 'react';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import type { MapMarker } from './map-canvas';

export function MapCanvas({ markers, current }: { markers: MapMarker[]; current: MapMarker | null }) {
  const map = useRef<MapView>(null);
  useEffect(() => {
    const coordinates = current ? [...markers, current] : markers;
    if (coordinates.length > 1) map.current?.fitToCoordinates(coordinates, { animated: true, edgePadding: { top: 70, right: 50, bottom: 70, left: 50 } });
  }, [current, markers]);
  return <MapView ref={map} provider={PROVIDER_GOOGLE} style={{ flex: 1 }} initialRegion={{ latitude: markers[0]!.latitude, longitude: markers[0]!.longitude, latitudeDelta: 0.04, longitudeDelta: 0.04 }}>
    {markers.map((point, index) => <Marker key={`${point.latitude}:${point.longitude}:${index}`} coordinate={point} title={`${index + 1}. ${point.name ?? 'Điểm dừng'}`} />)}
    {markers.length > 1 && <Polyline coordinates={markers} strokeColor="#277253" strokeWidth={4} />}
    {current && <Marker coordinate={current} title={current.label} pinColor="#277253" />}
  </MapView>;
}
