import React from 'react';
import { View } from 'react-native';

import DespesaSaida from '../components/despesa/DespesaSaida';

export default function DespesasRecentes({
  despesas,
  categoriaSelecionada,
  onCategoriaChange,
}) {
  return (
    <View style={{ flex: 1 }}>
      <DespesaSaida
        despesas={despesas}
        categoriaSelecionada={categoriaSelecionada}
        onCategoriaChange={onCategoriaChange}
        titulo="Despesas recentes"
      />
    </View>
  );
}
