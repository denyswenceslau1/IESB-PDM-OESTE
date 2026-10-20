import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const categorias = ['Alimentação', 'Transporte', 'Lazer', 'Contas'];

export default function GerenciarDespesa({ onAdicionarDespesa, onCancelar }) {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [data, setData] = useState(new Date());
  const [mostrarDatePicker, setMostrarDatePicker] = useState(false);
  const [erro, setErro] = useState('');

  const formatarData = (valorData) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(valorData);
  };

  const handleValorChange = (texto) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(texto)) {
      setValor(texto);
    }
  };

  const handleSalvar = () => {
    if (!descricao.trim() || !valor || !categoria) {
      setErro('Preencha a descrição, o valor e a categoria antes de salvar.');
      return;
    }

    const valorNumero = Number.parseFloat(valor);

    if (Number.isNaN(valorNumero) || valorNumero <= 0) {
      setErro('Informe um valor válido maior que zero.');
      return;
    }

    const novaDespesa = {
      id: Date.now().toString(),
      descricao: descricao.trim(),
      valor: valorNumero,
      categoria,
      data: data.toISOString(),
    };

    onAdicionarDespesa?.(novaDespesa);
    setDescricao('');
    setValor('');
    setCategoria('');
    setData(new Date());
    setErro('');
    Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Registrar despesa</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Ex: Supermercado"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Valor</Text>
        <TextInput
          value={valor}
          onChangeText={handleValorChange}
          placeholder="0.00"
          keyboardType="decimal-pad"
          style={styles.input}
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Categoria</Text>
        <View style={styles.categoriasWrapper}>
          {categorias.map((item) => (
            <Pressable
              key={item}
              onPress={() => setCategoria(item)}
              style={[
                styles.categoriaBotao,
                categoria === item && styles.categoriaBotaoAtivo,
              ]}
            >
              <Text
                style={[
                  styles.categoriaTexto,
                  categoria === item && styles.categoriaTextoAtivo,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Data</Text>
        <Pressable onPress={() => setMostrarDatePicker(true)} style={styles.dataInput}>
          <Text style={styles.dataTexto}>{formatarData(data)}</Text>
        </Pressable>

        {mostrarDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display="default"
            onChange={(_, novaData) => {
              setMostrarDatePicker(false);
              if (novaData) {
                setData(novaData);
              }
            }}
          />
        )}
      </View>

      {erro ? <Text style={styles.erro}>{erro}</Text> : null}

      <View style={styles.botoesRow}>
        <Pressable style={styles.botaoCancelar} onPress={onCancelar}>
          <Text style={styles.botaoCancelarTexto}>Cancelar</Text>
        </Pressable>

        <Pressable style={styles.botaoSalvar} onPress={handleSalvar}>
          <Text style={styles.botaoSalvarTexto}>Salvar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
  },
  categoriasWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categoriaBotao: {
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  categoriaBotaoAtivo: {
    backgroundColor: '#2563eb',
  },
  categoriaTexto: {
    fontWeight: '600',
    color: '#374151',
  },
  categoriaTextoAtivo: {
    color: '#fff',
  },
  dataInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  dataTexto: {
    color: '#111827',
    fontSize: 16,
  },
  erro: {
    color: '#dc2626',
    fontWeight: '600',
    marginBottom: 16,
  },
  botoesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  botaoCancelar: {
    flex: 1,
    backgroundColor: '#e5e7eb',
    borderRadius: 12,
    paddingVertical: 12,
    marginRight: 10,
    alignItems: 'center',
  },
  botaoCancelarTexto: {
    color: '#111827',
    fontWeight: '700',
  },
  botaoSalvar: {
    flex: 1,
    backgroundColor: '#16a34a',
    borderRadius: 12,
    paddingVertical: 12,
    marginLeft: 10,
    alignItems: 'center',
  },
  botaoSalvarTexto: {
    color: '#fff',
    fontWeight: '700',
  },
});
