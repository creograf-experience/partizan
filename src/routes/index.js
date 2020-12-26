import {
  createSwitchNavigator,
  createAppContainer,
} from 'react-navigation';

import AuthenticationStack from './AuthenticationStack';
import {
  ProfileSelectionScreen,
  WelcomeScreen,
  AppLoadingScreen,
} from '../screens';
import {
  AUTHENTICATION_STACK,
  PROFILE_SELECTION_SCREEN,
  WELCOME_SCREEN,
  TAB_NAVIGATOR,
  APP_LOADING_SCREEN,
} from '../constants';
import TabNavigator from './TabNavigation';


const RootNavigator = createSwitchNavigator(

  {
    [APP_LOADING_SCREEN]: {
      screen: AppLoadingScreen,
      navigationOptions: {
        header: null,
      },
    },

    [WELCOME_SCREEN]: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
      },
    },

    [AUTHENTICATION_STACK]: {
      screen: AuthenticationStack,
    },

    [PROFILE_SELECTION_SCREEN]: {
      screen: ProfileSelectionScreen,
      navigationOptions: {
        header: null,
      },
    },

    [TAB_NAVIGATOR]: {
      screen: TabNavigator,
    },


  },
  {
    initialRouteName: APP_LOADING_SCREEN,
  },
);

export default createAppContainer(RootNavigator);
