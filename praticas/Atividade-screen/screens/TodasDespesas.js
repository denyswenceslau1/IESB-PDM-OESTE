import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function TodasDespesas() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Todas as Despesas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
});
