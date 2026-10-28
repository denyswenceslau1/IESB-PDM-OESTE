import React, { useMemo, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, SafeAreaView, Text, View, StyleSheet, useColorScheme } from 'react-native';

import { ExpensesContextProvider, useExpenses } from './src/store/expenses-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import { getTheme } from './src/constants/theme';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { expenses } = useExpenses();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const despesasRecentes = useMemo(() => {
    const hoje = new Date();
    return expenses.filter((item) => {
      const data = new Date(item.date || item.data);
      const diffEmDias = (hoje - data) / (1000 * 60 * 60 * 24);
      return diffEmDias >= 0 && diffEmDias <= 7;
    });
  }, [expenses]);

  return (
    <Stack.Navigator
      initialRouteName="TodasDespesas"
      screenOptions={{
        headerBackTitle: 'Voltar',
        headerStyle: { backgroundColor: theme.surface },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={({ navigation }) => ({
          title: 'Todas as despesas',
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('GerenciarDespesa')}>
              <Text style={{ color: theme.primary, fontWeight: '700', fontSize: 16 }}>+ Nova</Text>
            </Pressable>
          ),
        })}
      />
      <Stack.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{ title: 'Despesas recentes' }}
      />
      <Stack.Screen
        name="GerenciarDespesa"
        component={GerenciarDespesa}
        options={({ route }) => ({
          title: route.params?.expenseId ? 'Editar despesa' : 'Nova despesa',
        })}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <ExpensesContextProvider>
        <AppNavigator />
      </ExpensesContextProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topo: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
  },
  botaoAdicionar: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  botaoAdicionarTexto: {
    color: '#fff',
    fontWeight: '700',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
  },
});
