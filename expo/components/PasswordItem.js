import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { deletePassword } from '../utils/storage';

export default function PasswordItem({ name, password }) {
  const handleDelete = async () => {
    await deletePassword(name);
  };

  return (
    <View style={styles.item}>
      <Text style={styles.name}>{name}</Text>
      <Text>{password}</Text>
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  name: {
    fontWeight: 'bold',
  },
});
