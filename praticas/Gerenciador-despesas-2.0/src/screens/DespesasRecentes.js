import React, { useMemo } from 'react';
import { View, useColorScheme } from 'react-native';

import { getTheme } from '../constants/theme';
import DespesaSaida from '../components/despesa/DespesaSaida';
import { useExpenses } from '../store/expenses-context';

export default function DespesasRecentes({ navigation }) {
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark');

  const despesasRecentes = useMemo(() => {
    const hoje = new Date();
    return expenses.filter((item) => {
      const data = new Date(item.date || item.data);
      const diferencaDias = (hoje - data) / (1000 * 60 * 60 * 24);
      return diferencaDias >= 0 && diferencaDias <= 7;
    });
  }, [expenses]);

  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <DespesaSaida
        despesas={despesasRecentes}
        categoriaSelecionada="Todas"
        onCategoriaChange={() => {}}
        titulo="Despesas recentes"
        theme={theme}
        onExpensePress={(expenseId) => navigation.navigate('GerenciarDespesa', { expenseId })}
      />
    </View>
  );
}
