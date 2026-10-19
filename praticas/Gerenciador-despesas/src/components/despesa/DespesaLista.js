import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';

import DespesaItem from './DespesaItem';

export default function DespesaLista({ despesas }) {
  return (
    <FlatList
      data={despesas}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <DespesaItem item={item} />}
      contentContainerStyle={styles.lista}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    paddingBottom: 24,
  },
});
