import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, Alert } from 'react-native';
import { savePassword } from '../utils/storage';

export default function AddPasswordScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!name.trim() || !password.trim()) {
      setError('Account Name and Password are required.');
      return;
    }

    try {
      const key = Date.now().toString();
      await savePassword(key, { name, password });
      Alert.alert('Success', 'Password saved successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      console.error('Error saving password:', err);
      Alert.alert('Error', 'Failed to save password. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Account Name</Text>
      <TextInput
        style={[styles.input, error && !name ? styles.errorInput : null]}
        placeholder="Enter account name"
        value={name}
        onChangeText={(text) => {
          setName(text);
          if (error) setError('');
        }}
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={[styles.input, error && !password ? styles.errorInput : null]}
        placeholder="Enter password"
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          if (error) setError('');
        }}
        secureTextEntry
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Button title="Save Password" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 16,
    fontSize: 14,
  },
});
