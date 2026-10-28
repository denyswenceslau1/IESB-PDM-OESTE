import { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import FadeIn from '../../components/FadeIn';
import useNotices from '../../hooks/useNotices';

export default function NoticesScreen() {
  const { notices, isLoading, error, reload } = useNotices();

  if (isLoading && !notices.length) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (error && !notices.length) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <Pressable style={styles.retryButton} onPress={reload}>
          <Text style={styles.retryText}>Tentar novamente</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mural de avisos</Text>

      <FlatList
        data={notices}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={notices.length === 0 ? styles.listEmpty : styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum aviso disponível.</Text>}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={reload} />} 
        renderItem={({ item }) => (
          <FadeIn>
            <View style={styles.noticeCard}>
              <Text style={styles.noticeTitle}>{item.title}</Text>
              <Text style={styles.noticeBody}>{item.body}</Text>
            </View>
          </FadeIn>
        )}
      />

      {error && notices.length > 0 ? (
        <View style={styles.inlineError}>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={reload}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 24,
  },
  listEmpty: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#475569',
    fontSize: 16,
  },
  noticeCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#0f172a',
  },
  noticeBody: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  retryButton: {
    marginTop: 12,
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  retryText: {
    color: '#fff',
    fontWeight: '700',
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 16,
    textAlign: 'center',
  },
  inlineError: {
    backgroundColor: '#fef2f2',
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
});
