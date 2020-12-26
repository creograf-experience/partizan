import { AsyncStorage } from 'react-native';

const jwtToken = async () => await AsyncStorage.getItem('token');

export default async () => ({
  headers: {
    Authorization: await jwtToken(),
  },
});
