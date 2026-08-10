import { planningConstraintsSchema } from '@wanderly/contracts';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const example = planningConstraintsSchema.parse({
  peopleCount: 2,
  budget: 700000,
  currency: 'VND',
  interests: ['cafe', 'photography', 'food'],
});

export default function HomeScreen() {
  const budgetLabel =
    example.budget === null
      ? 'chưa đặt'
      : `${example.budget.toLocaleString('vi-VN')}đ`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.eyebrow}>WANDERLY</Text>
        <Text style={styles.title}>Một hành trình vừa vặn với bạn.</Text>
        <Text style={styles.description}>
          Kịch bản mẫu có {example.peopleCount} người và ngân sách {budgetLabel}
          .
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#f4f7f2',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  eyebrow: {
    color: '#277253',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 16,
  },
  title: {
    color: '#17231f',
    fontSize: 48,
    fontWeight: '700',
    letterSpacing: -2,
    lineHeight: 50,
  },
  description: {
    color: '#52615b',
    fontSize: 17,
    lineHeight: 27,
    marginTop: 24,
  },
});
