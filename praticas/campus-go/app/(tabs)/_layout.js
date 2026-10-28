import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          const icons = {
            index: 'home-outline',
            tasks: 'checkbox-outline',
            wallet: 'wallet-outline',
            profile: 'person-outline',
          };

          return <Ionicons name={icons[route.name] || 'help-circle-outline'} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#64748b',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Início' }} />
      <Tabs.Screen name="tasks" options={{ title: 'Tarefas' }} />
      <Tabs.Screen name="wallet" options={{ title: 'Bolso' }} />
      <Tabs.Screen name="profile" options={{ title: 'Perfil' }} />
    </Tabs>
  );
}
