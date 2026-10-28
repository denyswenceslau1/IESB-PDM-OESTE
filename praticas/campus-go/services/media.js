import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export async function pickImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão necessária', 'Para escolher uma foto, permita o acesso à galeria.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.7,
    allowsEditing: true,
  });

  if (!result.canceled && result.assets?.[0]?.uri) {
    return result.assets[0].uri;
  }

  return null;
}

export async function takePhoto() {
  const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permissão da câmera negada', 'A câmera não pode abrir sem permissão.', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Abrir ajustes', onPress: () => Linking.openSettings() },
    ]);
    return null;
  }

  const result = await ImagePicker.launchCameraAsync({
    quality: 0.7,
    allowsEditing: true,
  });

  if (!result.canceled && result.assets?.[0]?.uri) {
    return result.assets[0].uri;
  }

  return null;
}
