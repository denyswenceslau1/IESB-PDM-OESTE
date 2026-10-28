import { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Link, router } from 'expo-router';

import { getCurrentPlace } from '../../services/location';
import { scheduleReminder } from '../../services/notifications';

export default function TasksScreen() {
  const [placeLabel, setPlaceLabel] = useState('Ainda não validado');

  const handleCheckIn = async () => {
    const place = await getCurrentPlace();
    if (!place) {
      Alert.alert('Permissão negada', 'Para registrar o local, permita o uso da localização.');
      return;
    }

    setPlaceLabel(place.label || 'Local identificado');
  };

  const handleReminder = async () => {
    await scheduleReminder('Hora de estudar', 10);
    Alert.alert('Lembrete', 'Lembrete agendado para 10 segundos.');
  };

  const handleComplete = async () => {
    try {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch (error) {
      console.warn('Haptics indisponível:', error);
    }

    Alert.alert('Tarefa concluída');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Tarefas</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Estudei aqui</Text>
          <Text style={styles.value}>{placeLabel}</Text>
          <Button title="Estudei aqui" onPress={handleCheckIn} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Lembrete</Text>
          <Button title="Lembrar em 10 s" onPress={handleReminder} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Conclusão</Text>
          <Button title="Concluir" onPress={handleComplete} />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Navegação</Text>
          <View style={styles.buttonRow}>
            <Link href="/task/42" style={styles.link}>Abrir tarefa 42</Link>
            <Button title="Nova tarefa" onPress={() => router.push('/new-task')} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
  },
  value: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 12,
  },
  buttonRow: {
    gap: 12,
  },
  link: {
    color: '#2563eb',
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 8,
  },
});
