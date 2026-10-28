import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({
  despesas,
  categoriaSelecionada,
  onCategoriaChange,
  titulo,
  theme,
  onExpensePress,
}) {
  const categorias = ['Todas', ...new Set(despesas.map((item) => item.category ?? item.categoria))];

  const despesasFiltradas =
    categoriaSelecionada === 'Todas'
      ? despesas
      : despesas.filter((item) => (item.category ?? item.categoria) === categoriaSelecionada);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <Text style={[styles.titulo, { color: theme.text }]}>{titulo}</Text>

      <View style={styles.filtros}>
        {categorias.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() => onCategoriaChange?.(categoria)}
            style={[
              styles.filtro,
              { backgroundColor: theme.chip },
              categoriaSelecionada === categoria && [styles.filtroAtivo, { backgroundColor: theme.primary }],
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                { color: categoriaSelecionada === categoria ? '#fff' : theme.chipText },
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      <DespesaSumario despesas={despesasFiltradas} theme={theme} />
      <DespesaLista despesas={despesasFiltradas} onExpensePress={onExpensePress} theme={theme} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 12,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  filtro: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  filtroAtivo: {
    backgroundColor: '#2563eb',
  },
  filtroTexto: {
    fontWeight: '600',
  },
});
