import React, { useEffect, useState } from 'react';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import MetaInput from './components/MetaInput';
import MetaList from './components/MetaList';

const STORAGE_KEY = '@metas_semestre';

export default function App() {
  const [textoMeta, setTextoMeta] = useState('');
  const [metas, setMetas] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    let ativo = true;

    const carregarMetas = async () => {
      try {
        const valorSalvo = await AsyncStorage.getItem(STORAGE_KEY);

        if (valorSalvo && ativo) {
          const listaCarregada = JSON.parse(valorSalvo);
          if (Array.isArray(listaCarregada)) {
            setMetas(listaCarregada);
          }
        }
      } catch (error) {
        Alert.alert(
          'Erro ao carregar metas',
          'Não foi possível restaurar as suas metas. Tente novamente.'
        );
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    };

    carregarMetas();

    return () => {
      ativo = false;
    };
  }, []);

  useEffect(() => {
    if (carregando) {
      return;
    }

    const salvarMetas = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(metas));
      } catch (error) {
        Alert.alert(
          'Erro ao salvar metas',
          'Não foi possível guardar suas metas no dispositivo.'
        );
      }
    };

    salvarMetas();
  }, [metas, carregando]);

  const adicionarMeta = () => {
    const metaTexto = textoMeta.trim();

    if (!metaTexto) {
      Alert.alert('Meta vazia', 'Digite o texto da meta antes de adicionar.');
      return;
    }

    const novaMeta = {
      id: Date.now().toString(),
      texto: metaTexto,
      criadaEm: new Date().toISOString(),
      concluida: false,
    };

    setMetas((listaAtual) => [novaMeta, ...listaAtual]);
    setTextoMeta('');
  };

  const removerMeta = (id) => {
    setMetas((listaAtual) => listaAtual.filter((meta) => meta.id !== id));
  };

  const alternarConclusao = (id) => {
    setMetas((listaAtual) =>
      listaAtual.map((meta) =>
        meta.id === id ? { ...meta, concluida: !meta.concluida } : meta
      )
    );
  };

  const metasPendentes = metas.filter((meta) => !meta.concluida).length;
  const metasConcluidas = metas.filter((meta) => meta.concluida).length;

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Image source={require('./assets/icon.png')} style={styles.logo} />
            <View style={styles.headerText}>
              <Text style={styles.title}>MetasSemestre</Text>
              <Text style={styles.subtitle}>
                {metasPendentes} pendentes / {metasConcluidas} concluídas
              </Text>
            </View>
          </View>

          <MetaInput
            value={textoMeta}
            onChangeText={setTextoMeta}
            onAdd={adicionarMeta}
          />

          <Text style={styles.listTitle}>Minhas metas</Text>

          <MetaList
            metas={metas}
            onDelete={removerMeta}
            onToggleComplete={alternarConclusao}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logo: {
    width: 56,
    height: 56,
    borderRadius: 16,
    marginRight: 14,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0f172a',
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#475569',
    marginTop: 4,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 12,
  },
});
