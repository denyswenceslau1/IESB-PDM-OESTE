import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { Share } from 'react-native';

import { useExpenses } from '../../store/expenses-context';

export default function WalletScreen() {
  const { expenses } = useExpenses();

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount || 0), 0);

  const handleShare = async () => {
    const message = `Gastei R$ ${total.toFixed(2)} neste semestre.`;
    try {
      await Share.share({ message });
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível compartilhar o resumo.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bolso</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Total acumulado</Text>
        <Text style={styles.total}>R$ {total.toFixed(2)}</Text>
      </View>

      <Button title="Compartilhar resumo" onPress={handleShare} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,
  },
  label: {
    color: '#64748b',
    fontSize: 16,
  },
  total: {
    fontSize: 32,
    fontWeight: '800',
    marginTop: 8,
    color: '#0f172a',
  },
});
