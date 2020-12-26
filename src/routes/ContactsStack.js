import { createStackNavigator } from 'react-navigation';
import React from 'react';

import { Image } from 'react-native';
import {
  CONTACTS_SCREEN,
  BLACKLIST_SCREEN,
  CONTACT_SCREEN,
  colors,
} from '../constants';
import {
  ContactsScreen,
  BlacklistScreen,
  ContactScreen
} from '../screens';

import ContactsImage from '../../assets/icons/friends.png';

const MainStack = createStackNavigator(
  {
    [CONTACTS_SCREEN]: {
      screen: ContactsScreen,
    },

    [CONTACT_SCREEN]: {
      screen: ContactScreen,
    },

    [BLACKLIST_SCREEN]: {
      screen: BlacklistScreen,
    },
  },
  {
    initialRouteName: CONTACTS_SCREEN,
    navigationOptions: {
      tabBarColor: colors.secondaryBackgroundColor,
      tabBarIcon: <Image
        style={{ height: 25, width: 25 }}
        source={ContactsImage}
      />,
    },
  },
);

export default MainStack;
