import React, { useMemo, useState } from 'react';
import { Platform, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';

import { getTheme } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';
import useDebounce from '../hooks/useDebounce';

export default function TodasDespesas({ navigation }) {
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark');
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 250);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todas');

  const despesasFiltradas = useMemo(() => {
    const textoBusca = debouncedSearch.trim().toLowerCase();
    const base = expenses.filter((item) => {
      const description = (item.description ?? item.descricao ?? '').toLowerCase();
      return description.includes(textoBusca);
    });

    if (categoriaSelecionada === 'Todas') {
      return base;
    }

    return base.filter((item) => (item.category ?? item.categoria) === categoriaSelecionada);
  }, [categoriaSelecionada, debouncedSearch, expenses]);

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}> 
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Buscar despesa"
        placeholderTextColor={theme.textMuted}
        style={[
          styles.searchInput,
          {
            backgroundColor: theme.surface,
            borderColor: theme.border,
            color: theme.text,
          },
        ]}
      />

      <DespesaSaida
        despesas={despesasFiltradas}
        categoriaSelecionada={categoriaSelecionada}
        onCategoriaChange={setCategoriaSelecionada}
        titulo="Todas as despesas"
        theme={theme}
        onExpensePress={(expenseId) => navigation.navigate('GerenciarDespesa', { expenseId })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    marginHorizontal: 16,
    marginTop: 12,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 12 : 10,
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16,
  },
});
