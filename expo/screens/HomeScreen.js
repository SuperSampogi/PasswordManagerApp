import React, { useState, useEffect } from 'react';
import { View, FlatList, TextInput, Button, StyleSheet } from 'react-native';
import { getPasswords } from '../utils/storage';
import PasswordItem from '../components/PasswordItem';

export default function HomeScreen({ navigation }) {
  const [passwords, setPasswords] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredPasswords, setFilteredPasswords] = useState([]);

  useEffect(() => {
    const fetchPasswords = async () => {
      const storedPasswords = await getPasswords();
      setPasswords(storedPasswords);
      setFilteredPasswords(storedPasswords); // Initialize with all passwords
    };
    fetchPasswords();
  }, []);

  useEffect(() => {
    const filtered = passwords.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredPasswords(filtered);
  }, [search, passwords]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search accounts..."
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={filteredPasswords}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <PasswordItem name={item.name} password={item.password} />
        )}
      />
      <Button title="Add New Password" onPress={() => navigation.navigate('AddPassword')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchBar: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
});
