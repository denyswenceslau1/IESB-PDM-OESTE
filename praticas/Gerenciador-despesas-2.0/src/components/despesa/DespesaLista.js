import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas, onExpensePress, theme, emptyMessage = 'Nenhuma despesa. Toque em + para adicionar.' }) {
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <MaterialIcons name="money-off" size={48} color={theme.textMuted} />
      <Text style={[styles.emptyText, { color: theme.text }]}>{emptyMessage}</Text>
    </View>
  );

  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <DespesaItem item={item} onPress={onExpensePress} theme={theme} />
      )}
      ListEmptyComponent={renderEmpty}
      contentContainerStyle={styles.lista}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    textAlign: 'center',
  },
});
