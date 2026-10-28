import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { pickImage } from '../../services/media';

const PROFILE_KEY = '@profile-photo';

export default function ProfileScreen() {
  const [photoUri, setPhotoUri] = useState(null);

  useEffect(() => {
    const loadProfilePhoto = async () => {
      const stored = await AsyncStorage.getItem(PROFILE_KEY);
      if (stored) {
        setPhotoUri(stored);
      }
    };

    loadProfilePhoto();
  }, []);

  const handlePickPhoto = async () => {
    const uri = await pickImage();
    if (!uri) return;
    await AsyncStorage.setItem(PROFILE_KEY, uri);
    setPhotoUri(uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil</Text>

      <Pressable onPress={handlePickPhoto}>
        {photoUri ? (
          <Image source={{ uri: photoUri }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>+</Text>
          </View>
        )}
      </Pressable>

      <Text style={styles.label}>Toque para trocar a foto</Text>
      <Button title="Selecionar foto" onPress={handlePickPhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f8fafc',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: '#2563eb',
    marginBottom: 16,
    backgroundColor: '#dbeafe',
  },
  avatarPlaceholder: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#dbeafe',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2563eb',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 42,
    color: '#2563eb',
    fontWeight: '700',
  },
  label: {
    fontSize: 16,
    color: '#475569',
    marginBottom: 16,
  },
});
