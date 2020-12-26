import { createStackNavigator } from 'react-navigation';

import {
  RegistrationScreen,
  LoadingScreen,
} from '../screens';
import {
  REGISTRATION_SCREEN,
  LOADING_SCREEN,
} from '../constants';


const AuthenticationStack = createStackNavigator(
  {
    [REGISTRATION_SCREEN]: {
      screen: RegistrationScreen,
      navigationOptions: {
        header: null,
      },
    },
    [LOADING_SCREEN]: {
      screen: LoadingScreen,
      navigationOptions: {
        header: null,
      },
    },
  },
  {
    initialRouteName: REGISTRATION_SCREEN,
  },
);

export default AuthenticationStack;
