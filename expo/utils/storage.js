import * as SecureStore from 'expo-secure-store';

export const savePassword = async (key, value) => {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving password:', error);
  }
};

export const getPasswords = async () => {
  try {
    const keys = await SecureStore.getAllKeysAsync();
    const result = await Promise.all(
      keys.map(async (key) => ({
        key,
        ...(JSON.parse(await SecureStore.getItemAsync(key))),
      }))
    );
    return result;
  } catch (error) {
    console.error('Error retrieving passwords:', error);
    return [];
  }
};

export const deletePassword = async (key) => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error('Error deleting password:', error);
  }
};
