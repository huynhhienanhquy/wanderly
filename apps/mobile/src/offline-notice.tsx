import { StyleSheet, Text, View } from 'react-native';

export function OfflineNotice({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return <View accessibilityLiveRegion="polite" accessibilityRole="alert" style={styles.container}>
    <Text style={styles.text}>Bạn đang ngoại tuyến. Nội dung đã lưu có thể không phải mới nhất.</Text>
  </View>;
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff1c7', borderRadius: 10, marginBottom: 12, padding: 12 },
  text: { color: '#694f00', fontWeight: '600' },
});
