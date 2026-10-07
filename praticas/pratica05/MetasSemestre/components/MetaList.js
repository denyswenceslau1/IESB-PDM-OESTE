import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

export default function MetaList({ metas, onDelete, onToggleComplete }) {
  const renderMeta = ({ item }) => (
    <Pressable
      onPress={() => onToggleComplete(item.id)}
      android_ripple={{ color: '#dbeafe' }}
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
        item.concluida && styles.itemConcluida,
      ]}
    >
      <View style={styles.metaTextWrap}>
        <Text
          style={[
            styles.metaText,
            item.concluida && styles.metaTextConcluida,
          ]}
        >
          {item.texto}
        </Text>
        <Text style={styles.metaDate}>
          {new Date(item.criadaEm).toLocaleDateString('pt-BR')}
        </Text>
      </View>

      <Pressable
        onPress={() => onDelete(item.id)}
        android_ripple={{ color: '#fecaca' }}
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.deleteButtonPressed,
        ]}
      >
        <Text style={styles.deleteButtonText}>Remover</Text>
      </Pressable>
    </Pressable>
  );

  return (
    <FlatList
      data={metas}
      keyExtractor={(item) => item.id}
      renderItem={renderMeta}
      contentContainerStyle={metas.length === 0 ? styles.emptyContainer : styles.listContent}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Text style={styles.emptyTitle}>Nenhuma meta cadastrada</Text>
          <Text style={styles.emptyText}>
            Adicione sua primeira meta de estudo para começar o semestre com foco.
          </Text>
        </View>
      }
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingBottom: 18,
  },
  emptyContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ffffff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  itemPressed: {
    backgroundColor: '#f8fafc',
  },
  itemConcluida: {
    borderColor: '#86efac',
    backgroundColor: '#f0fdf4',
  },
  metaTextWrap: {
    flex: 1,
    marginRight: 12,
  },
  metaText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  metaTextConcluida: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  metaDate: {
    fontSize: 12,
    color: '#64748b',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  deleteButtonPressed: {
    backgroundColor: '#dc2626',
  },
  deleteButtonText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
  emptyState: {
    padding: 24,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    lineHeight: 20,
  },
});
