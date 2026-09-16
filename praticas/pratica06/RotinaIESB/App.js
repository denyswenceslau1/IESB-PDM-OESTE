import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

import CompromissoInput from './components/CompromissoInput';
import CompromissoList from './components/CompromissoList';
import {
  alertaVazio,
  botaoAdicionar,
  erroCarregamento,
  erroSalvamento,
  listaVazia,
  placeholderCompromisso,
  tituloApp,
  tituloLista,
} from './labels';

const STORAGE_KEY = '@rotina_iesb_compromissos';

export default function App() {
  const [texto, setTexto] = useState('');
  const [compromissos, setCompromissos] = useState([]);

  useEffect(() => {
    const carregarCompromissos = async () => {
      try {
        const dadosSalvos = await AsyncStorage.getItem(STORAGE_KEY);

        if (dadosSalvos !== null) {
          const listaCarregada = JSON.parse(dadosSalvos);

          if (Array.isArray(listaCarregada)) {
            setCompromissos(listaCarregada);
          }
        }
      } catch (error) {
        Alert.alert('Erro', erroCarregamento);
      }
    };

    carregarCompromissos();
  }, []);

  useEffect(() => {
    const salvarCompromissos = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(compromissos));
      } catch (error) {
        Alert.alert('Erro', erroSalvamento);
      }
    };

    salvarCompromissos();
  }, [compromissos]);

  const adicionarCompromisso = () => {
    const valor = texto.trim();

    if (!valor) {
      Alert.alert('Atenção', alertaVazio);
      return;
    }

    const novoCompromisso = {
      id: Date.now().toString(),
      texto: valor,
      criadoEm: new Date().toISOString(),
    };

    setCompromissos((atual) => [novoCompromisso, ...atual]);
    setTexto('');
  };

  const removerCompromisso = (id) => {
    setCompromissos((atual) => atual.filter((item) => item.id !== id));
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="dark" />

        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/logo.png')} style={styles.logo} resizeMode="contain" />
            <View style={styles.headerText}>
              <Text style={styles.title}>{tituloApp}</Text>
              <Text style={styles.counter}>
                {compromissos.length} pendente{compromissos.length === 1 ? '' : 's'}
              </Text>
            </View>
          </View>

          <CompromissoInput
            value={texto}
            onChangeText={setTexto}
            onAdd={adicionarCompromisso}
            labels={{
              placeholder: placeholderCompromisso,
              buttonText: botaoAdicionar,
            }}
          />

          <CompromissoList
            itens={compromissos}
            onDelete={removerCompromisso}
            tituloLista={tituloLista}
            listaVazia={listaVazia}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#eef4ff',
  },
  container: {
    flex: 1,
    backgroundColor: '#eef4ff',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  logo: {
    width: 52,
    height: 52,
    borderRadius: 14,
    marginRight: 12,
    backgroundColor: '#dae5ff',
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1d2d4d',
  },
  counter: {
    marginTop: 3,
    fontSize: 14,
    color: '#5d6d96',
    fontWeight: '600',
  },
});

