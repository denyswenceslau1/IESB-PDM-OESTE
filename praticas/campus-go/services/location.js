import { Alert } from 'react-native';
import * as Location from 'expo-location';

export async function getCurrentPlace() {
  const { status } = await Location.requestForegroundPermissionsAsync();

  if (status !== 'granted') {
    Alert.alert('Permissão de localização negada', 'Não foi possível obter sua localização.');
    return null;
  }

  const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
  const place = await Location.reverseGeocodeAsync({
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  });

  const item = place?.[0];

  return {
    label: item ? `${item.name || ''} ${item.street || ''}, ${item.city || ''}`.trim() || 'Local encontrado' : 'Local encontrado',
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
  };
}
