import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from 'react-native';

import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const despesasIniciais = [
  {
    id: '1',
    descricao: 'Mercado',
    valor: 145.8,
    categoria: 'Alimentação',
    data: '2026-10-15T12:00:00.000Z',
  },
  {
    id: '2',
    descricao: 'Combustível',
    valor: 210.35,
    categoria: 'Transporte',
    data: '2026-10-18T08:30:00.000Z',
  },
  {
    id: '3',
    descricao: 'Cinema',
    valor: 48.9,
    categoria: 'Lazer',
    data: '2026-10-12T19:00:00.000Z',
  },
  {
    id: '4',
    descricao: 'Internet',
    valor: 89.99,
    categoria: 'Contas',
    data: '2026-10-10T10:00:00.000Z',
  },
];

const tabs = [
  { key: 'todas', label: 'Todas' },
  { key: 'recentes', label: 'Recentes' },
];

export default function App() {
  const [despesas, setDespesas] = useState(despesasIniciais);
  const [telaAtual, setTelaAtual] = useState('todas');
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas');

  const despesasRecentes = useMemo(() => {
    const hoje = new Date();

    return despesas.filter((item) => {
      const data = new Date(item.data);
      const diffEmDias = (hoje - data) / (1000 * 60 * 60 * 24);
      return diffEmDias <= 15;
    });
  }, [despesas]);

  const handleAdicionarDespesa = (novaDespesa) => {
    setDespesas((atual) => [novaDespesa, ...atual]);
    setTelaAtual('todas');
    setCategoriaFiltro('Todas');
  };

  const renderTela = () => {
    if (telaAtual === 'gerenciar') {
      return (
        <GerenciarDespesa
          onAdicionarDespesa={handleAdicionarDespesa}
          onCancelar={() => setTelaAtual('todas')}
        />
      );
    }

    if (telaAtual === 'recentes') {
      return (
        <DespesasRecentes
          despesas={despesasRecentes}
          categoriaSelecionada={categoriaFiltro}
          onCategoriaChange={setCategoriaFiltro}
        />
      );
    }

    return (
      <TodasDespesas
        despesas={despesas}
        categoriaSelecionada={categoriaFiltro}
        onCategoriaChange={setCategoriaFiltro}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.titulo}>Gerenciador de Despesas</Text>
        <Pressable
          style={styles.botaoAdicionar}
          onPress={() => setTelaAtual('gerenciar')}
        >
          <Text style={styles.botaoAdicionarTexto}>+ Nova</Text>
        </Pressable>
      </View>

      <View style={styles.tabBar}>
        {tabs.map((tab) => (
          <Pressable
            key={tab.key}
            style={[
              styles.tabButton,
              telaAtual === tab.key && styles.tabButtonAtivo,
            ]}
            onPress={() => {
              setTelaAtual(tab.key);
              setCategoriaFiltro('Todas');
            }}
          >
            <Text
              style={[
                styles.tabText,
                telaAtual === tab.key && styles.tabTextAtivo,
              ]}
            >
              {tab.label}
            </Text>
          </Pressable>
        ))}
      </View>

      {renderTela()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  topo: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
  },
  botaoAdicionar: {
    backgroundColor: '#2563eb',
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
    backgroundColor: '#fff',
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
  tabButtonAtivo: {
    backgroundColor: '#dbeafe',
  },
  tabText: {
    fontSize: 14,
    color: '#6b7280',
    fontWeight: '600',
  },
  tabTextAtivo: {
    color: '#1d4ed8',
  },
});
