import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function CompromissoList({ itens, onDelete, tituloLista, listaVazia }) {
  const renderItem = ({ item }) => (
    <Pressable
      onPress={() => onDelete(item.id)}
      style={({ pressed }) => [styles.item, pressed && styles.itemPressed]}
      android_ripple={{ color: '#dfe9ff' }}
    >
      <Text style={styles.itemText}>{item.texto}</Text>
      <Text style={styles.deleteText}>Remover</Text>
    </Pressable>
  );

  return (
    <View style={styles.listContainer}>
      <Text style={styles.listTitle}>{tituloLista}</Text>

      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>{listaVazia}</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
    backgroundColor: '#f7f9ff',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#dde5ff',
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1d2d4d',
    marginBottom: 12,
  },
  listContent: {
    flexGrow: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e1eafc',
  },
  itemPressed: {
    opacity: 0.85,
  },
  itemText: {
    flex: 1,
    color: '#1d2a3a',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
  },
  deleteText: {
    color: '#d04d4d',
    fontWeight: '700',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 15,
    color: '#5f6d8d',
    textAlign: 'center',
  },
});
