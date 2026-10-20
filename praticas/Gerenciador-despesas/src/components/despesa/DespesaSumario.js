import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function DespesaSumario({ despesas }) {
  const somaDespesas = despesas.reduce(
    (acumulador, item) => acumulador + Number(item.valor || 0),
    0,
  );

  const textoCor = somaDespesas > 200 ? '#dc2626' : '#111827';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Total</Text>
      <Text style={[styles.valor, { color: textoCor }]}>
        R$ {somaDespesas.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dbeafe',
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    color: '#1e3a8a',
    fontSize: 14,
    fontWeight: '700',
  },
  valor: {
    fontSize: 18,
    fontWeight: '800',
  },
});
