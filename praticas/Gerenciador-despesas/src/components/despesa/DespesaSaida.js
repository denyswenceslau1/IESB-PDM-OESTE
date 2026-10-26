import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({
  despesas,
  categoriaSelecionada,
  onCategoriaChange,
  titulo,
}) {
  const categorias = ['Todas', ...new Set(despesas.map((item) => item.categoria))];

  const despesasFiltradas =
    categoriaSelecionada === 'Todas'
      ? despesas
      : despesas.filter((item) => item.categoria === categoriaSelecionada);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>{titulo}</Text>

      <View style={styles.filtros}>
        {categorias.map((categoria) => (
          <Pressable
            key={categoria}
            onPress={() => onCategoriaChange(categoria)}
            style={[
              styles.filtro,
              categoriaSelecionada === categoria && styles.filtroAtivo,
            ]}
          >
            <Text
              style={[
                styles.filtroTexto,
                categoriaSelecionada === categoria && styles.filtroTextoAtivo,
              ]}
            >
              {categoria}
            </Text>
          </Pressable>
        ))}
      </View>

      <DespesaSumario despesas={despesasFiltradas} />
      <DespesaLista despesas={despesasFiltradas} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  filtros: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 14,
  },
  filtro: {
    backgroundColor: '#e5e7eb',
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
    color: '#374151',
    fontWeight: '600',
  },
  filtroTextoAtivo: {
    color: '#fff',
  },
});
