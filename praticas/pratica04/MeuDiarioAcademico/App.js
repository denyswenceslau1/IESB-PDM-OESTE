import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ADD_BUTTON_TEXT,
  APP_TITLE,
  INPUT_PLACEHOLDER,
  LIST_TITLE,
  SHOW_ONLY_REQUIRED_TEXT,
} from './labels';

const disciplinasIniciais = [
  { id: '1', nome: 'Cálculo I', obrigatoria: true },
  { id: '2', nome: 'Física', obrigatoria: true },
  { id: '3', nome: 'Algoritmos', obrigatoria: true },
  { id: '4', nome: 'Sociologia', obrigatoria: false },
  { id: '5', nome: 'Inglês', obrigatoria: false },
];

export default function App() {
  const [nomeDisciplina, setNomeDisciplina] = useState('');
  const [disciplinas, setDisciplinas] = useState(disciplinasIniciais);
  const [mostrarObrigatorias, setMostrarObrigatorias] = useState(false);

  const disciplinasVisiveis = useMemo(() => {
    if (!mostrarObrigatorias) return disciplinas;
    return disciplinas.filter((disciplina) => disciplina.obrigatoria);
  }, [disciplinas, mostrarObrigatorias]);

  const adicionarDisciplina = () => {
    const disciplina = nomeDisciplina.trim();

    if (!disciplina) return;

    setDisciplinas((listaAtual) => [
      ...listaAtual,
      {
        id: String(Date.now()),
        nome: disciplina,
        obrigatoria: false,
      },
    ]);
    setNomeDisciplina('');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>{APP_TITLE}</Text>
        </View>

        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>{SHOW_ONLY_REQUIRED_TEXT}</Text>
          <Switch
            value={mostrarObrigatorias}
            onValueChange={setMostrarObrigatorias}
            trackColor={{ false: '#dfe6e9', true: '#74b9ff' }}
            thumbColor={mostrarObrigatorias ? '#0984e3' : '#f4f4f4'}
          />
        </View>

        <View style={styles.inputRow}>
          <TextInput
            value={nomeDisciplina}
            onChangeText={setNomeDisciplina}
            placeholder={INPUT_PLACEHOLDER}
            placeholderTextColor="#7f8c8d"
            style={styles.input}
          />

          <Pressable
            onPress={adicionarDisciplina}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.addButtonPressed,
            ]}
          >
            <Text style={styles.addButtonText}>{ADD_BUTTON_TEXT}</Text>
          </Pressable>
        </View>

        <Text style={styles.listTitle}>{LIST_TITLE}</Text>

        <View style={styles.listContainer}>
          {disciplinasVisiveis.map((disciplina) => (
            <View key={disciplina.id} style={styles.item}>
              <Text style={styles.itemText}>{disciplina.nome}</Text>
              <Text style={styles.itemType}>
                {disciplina.obrigatoria ? 'Obrigatória' : 'Optativa'}
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f7fb',
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1f2937',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18,
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  switchLabel: {
    fontSize: 15,
    color: '#374151',
    fontWeight: '600',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    minWidth: 0,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    color: '#111827',
    marginRight: 12,
  },
  addButton: {
    width: '28%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563eb',
    borderRadius: 12,
    paddingVertical: 12,
  },
  addButtonPressed: {
    backgroundColor: '#1d4ed8',
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 15,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  listContainer: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  itemText: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '600',
  },
  itemType: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '700',
    backgroundColor: '#e0f2fe',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
