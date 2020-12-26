import { AsyncStorage } from 'react-native';

async function getHeaders(withToken) {
  return {
    'Content-Type': 'application/json',
    Authorization: withToken && await AsyncStorage.getItem('token')
  };
}

export default getHeaders;
