import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function DespesaSumario({ despesas, theme }) {
  const total = despesas.reduce((sum, item) => sum + Number(item.amount ?? item.valor ?? 0), 0);

  return (
    <View style={[styles.container, { backgroundColor: theme.primarySoft }]}> 
      <Text style={[styles.label, { color: theme.primary }]}>Total</Text>
      <Text style={[styles.valor, { color: theme.text }]}>
        R$ {total.toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '700',
  },
  valor: {
    fontSize: 18,
    fontWeight: '800',
  },
});
