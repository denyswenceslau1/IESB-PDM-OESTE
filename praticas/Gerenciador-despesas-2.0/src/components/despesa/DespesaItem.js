import React from 'react';
import { Pressable, Text, View, StyleSheet, Platform } from 'react-native';

const formatarData = (valor) => {
  const data = new Date(valor);
  return Number.isNaN(data.getTime()) ? 'Data inválida' : data.toLocaleDateString('pt-BR');
};

export default function DespesaItem({ item, onPress, theme }) {
  return (
    <Pressable onPress={() => onPress?.(item.id)} style={[styles.card, { backgroundColor: theme.surface }, platformShadow(theme)]}>
      <View style={styles.headerRow}>
        <Text style={[styles.data, { color: theme.textMuted }]}>{formatarData(item.date || item.data)}</Text>
        <View style={[styles.tag, { backgroundColor: theme.chip }]}>
          <Text style={[styles.tagTexto, { color: theme.chipText }]}>{item.category}</Text>
        </View>
      </View>

      <Text style={[styles.descricao, { color: theme.text }]}>{item.description}</Text>
      <Text style={[styles.valor, { color: theme.text }]}>R$ {Number(item.amount ?? (item.valor ?? 0)).toFixed(2)}</Text>
    </Pressable>
  );
}

const platformShadow = (theme) => {
  if (Platform.OS === 'ios') {
    return {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 3 },
    };
  }

  return {
    elevation: 3,
  };
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  data: {
    fontSize: 12,
    fontWeight: '600',
  },
  tag: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  tagTexto: {
    fontSize: 11,
    fontWeight: '700',
  },
  descricao: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 6,
  },
  valor: {
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'right',
  },
});
