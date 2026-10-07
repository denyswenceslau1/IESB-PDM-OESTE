import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

export default function CompromissoInput({ value, onChangeText, onAdd, labels }) {
  return (
    <View style={styles.inputRow}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={labels.placeholder}
        placeholderTextColor="#7d88aa"
        style={styles.input}
        autoCapitalize="sentences"
        autoCorrect
        maxLength={120}
      />

      <Pressable
        onPress={onAdd}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
        android_ripple={{ color: '#274bb0' }}
      >
        <Text style={styles.buttonText}>{labels.buttonText}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    flex: 1,
    minWidth: 0,
    height: 52,
    borderWidth: 1,
    borderColor: '#d2dcff',
    borderRadius: 14,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    color: '#1b2540',
    fontSize: 16,
  },
  button: {
    width: '28%',
    minWidth: 90,
    height: 52,
    marginLeft: 10,
    backgroundColor: '#3559d6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
});
