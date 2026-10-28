import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

export default function NewTaskScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nova tarefa</Text>
      <Text style={styles.text}>Aqui você pode adicionar uma tarefa.</Text>
      <Button title="Fechar" onPress={() => router.back()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#f8fafc',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 20,
    color: '#475569',
  },
});
