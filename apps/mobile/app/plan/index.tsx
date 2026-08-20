import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PlanScreen() {
  return <SafeAreaView style={styles.safe}><View style={styles.container}>
    <Text style={styles.title}>Kế hoạch của bạn</Text>
    <Text style={styles.body}>Timeline sẽ xuất hiện sau khi bạn chọn địa điểm hoặc tạo kế hoạch bằng Wanderly AI.</Text>
    <Link href="/explore" style={styles.link}>Chọn địa điểm</Link>
  </View></SafeAreaView>;
}

const styles = StyleSheet.create({ safe: { flex: 1, backgroundColor: '#f4f7f2' }, container: { flex: 1, padding: 24, justifyContent: 'center' }, title: { fontSize: 34, fontWeight: '700', color: '#17231f' }, body: { color: '#52615b', fontSize: 17, lineHeight: 26, marginTop: 16 }, link: { color: '#277253', fontWeight: '700', marginTop: 24 } });
