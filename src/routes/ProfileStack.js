import { createStackNavigator } from 'react-navigation';
import React from 'react';

import {
  PROFILE_SCREEN,
  CHANGE_ANON_PROFILE_SCREEN,
  colors,
} from '../constants';
import {
  ProfileScreen,
  ChangeAnonProfileScreen
} from '../screens';

import { Image } from 'react-native';
import ProfileImage from '../../assets/icons/user.png';


const MainStack = createStackNavigator(
  {
    [PROFILE_SCREEN]: {
      screen: ProfileScreen,
    },
    [CHANGE_ANON_PROFILE_SCREEN]: {
      screen: ChangeAnonProfileScreen
    }
  },
  {
    initialRouteName: PROFILE_SCREEN,
    navigationOptions: {
      tabBarColor: colors.secondaryBackgroundColor,
      tabBarIcon: <Image
        style={{ height: 25, width: 25 }}
        source={ProfileImage}
      />,
    },
  },
);

export default MainStack;
