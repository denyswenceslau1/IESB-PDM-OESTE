import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatarData = (valor) => {
  const data = new Date(valor);
  return Number.isNaN(data.getTime())
    ? 'Data inválida'
    : data.toLocaleDateString('pt-BR');
};

export default function DespesaItem({ item }) {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.data}>{formatarData(item.data)}</Text>
        <View style={styles.tag}>
          <Text style={styles.tagTexto}>{item.categoria}</Text>
        </View>
      </View>

      <Text style={styles.descricao}>{item.descricao}</Text>
      <Text style={styles.valor}>R$ {Number(item.valor).toFixed(2)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  data: {
    color: '#6b7280',
    fontSize: 12,
    fontWeight: '600',
  },
  tag: {
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagTexto: {
    color: '#374151',
    fontSize: 11,
    fontWeight: '700',
  },
  descricao: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  valor: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
});
