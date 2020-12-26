import { createBottomTabNavigator } from 'react-navigation';

import MessageStack from './MessageStack';
import ContactsStack from './ContactsStack';
import ProfileStack from './ProfileStack';

const TabNavigator = createBottomTabNavigator(
  {
    Сообщения: {
      screen: MessageStack,
    },
    Контакты: {
      screen: ContactsStack,
    },
    Профиль: {
      screen: ProfileStack,
    },
  },
  {
    initialRouteName: 'Сообщения',
    barStyle: { justifyContent: 'space-evenly' },
    shifting: true,
  },
);

export default TabNavigator;
