import { AsyncStorage } from 'react-native';

const deviceStorage = {
  async saveKey(key, valueToSave) {
    try {
      await AsyncStorage.setItem(key, valueToSave);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },

  async getItem(key){
    try {
      await AsyncStorage.getItem(key);
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  },
  async delete(key) {
    try{
      await AsyncStorage.removeItem(key)
    } catch (error) {
      console.log('AsyncStorage Error: ' + error.message);
    }
  }
};

export default deviceStorage;