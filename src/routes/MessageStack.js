import { createStackNavigator } from 'react-navigation';
import React from 'react';
import { Image } from 'react-native';

import {
  CHAT_LIST_SCREEN,
  ACTIVE_CHAT_SCREEN,
  IMAGE_FULL_SCREEN,
  colors,
} from '../constants';
import {
  ChatListScreen,
  ActiveChatScreen,
  ImageFullScreen,
} from '../screens';


const MessageStack = createStackNavigator(
  {
    [CHAT_LIST_SCREEN]: {
      screen: ChatListScreen,
    },

    [ACTIVE_CHAT_SCREEN]: {
      screen: ActiveChatScreen,
    },

    [IMAGE_FULL_SCREEN]: {
      screen: ImageFullScreen,
    },
  },
  {
    initialRouteName: CHAT_LIST_SCREEN,
  },
);

MessageStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;

  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map((route) => {
      if (route.routeName === IMAGE_FULL_SCREEN) {
        tabBarVisible = false;
      } else {
        tabBarVisible = true;
      }
    });
  }

  return {
    tabBarVisible,
    tabBarColor: colors.secondaryBackgroundColor,
    tabBarIcon: <Image
      style={{ height: 25, width: 25 }}
      source={require('../../assets/icons/chat.png')}
    />,
  };
};

export default MessageStack;
