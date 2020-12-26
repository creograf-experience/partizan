import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
  Alert,
  AsyncStorage
} from 'react-native';

import api from '../../networkers';
import { fetchChats, setActiveChat } from '../../actions';
import { ACTIVE_CHAT_SCREEN, CONTACTS_SCREEN } from '../../constants';

import Spinner from '../../components/Spinner';
import ChatList from './components/ChatList';
import HeaderRightBtn from './components/HeaderRightBtn';

class ChatListScreen extends PureComponent {
  state = {
    isLoading: false,
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    await this.registerForPushNotificationsAsync();

    await this.sendContactsToServer();
    await this.props.fetchChats();

    this.setState({ isLoading: false });

    this.notificationSubscription = Notifications.addListener(this.handleNotification);
  }

  async componentDidUpdate(prevProps) {  
    const { isSocketConnected, fetchChats } = this.props;

    if (prevProps.isSocketConnected && !isSocketConnected) {
      if (!await AsyncStorage.getItem('token')) return;

      console.log('SCOKET IS GONE');
      this.setState({ isLoading: true });
      await fetchChats();
      this.setState({ isLoading: false });
    };
  }

  handleNotification = notification => {
    const { chat } = notification.data;
    const { navigation, setActiveChat, activeChat } = this.props;

    if (!chat) {
      navigation.navigate(CONTACTS_SCREEN);
      return;
    }

    if (!activeChat || activeChat._id !== chat._id) {
      setActiveChat(chat);
      navigation.navigate(ACTIVE_CHAT_SCREEN, {
        header: chat.withWho.fake ? chat.withWho.fake.profile.name : chat.withWho.contactName
      });
    }
  };

  registerForPushNotificationsAsync = async () => {
    try {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
  
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
  
      if (finalStatus !== 'granted') {
        return;
      }

      const ExpoPushToken = await Notifications.getExpoPushTokenAsync();
      await AsyncStorage.setItem('ExpoPushToken', ExpoPushToken);
      await api.pushtoken.add(ExpoPushToken)

    } catch (err) {
      return console.warn(err);
    }
  };

  sendContactsToServer = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.CONTACTS);

      if (permission.status !== 'granted') {
        return Alert.alert('Нет доступа к контактам', 'Предоставьте доступ в настройках');
      }

      let { data } = await Contacts.getContactsAsync();
      if (!data.length) return Alert.alert('', 'У вас нет контактов');
      console.log()
      await api.contacts.addMany(data)

    } catch (err) {
      console.warn(err);
    }
  };

  render() {
    const { chats } = this.props;
    const { isLoading } = this.state;

    if (isLoading) return <Spinner />;

    return (
      <View style={styles.container}>
        <ChatList chats={chats} />
      </View>
    );
  }
}

ChatListScreen.navigationOptions = ({ navigation }) => ({
  title: 'Сообщения',
  headerRight: <HeaderRightBtn />
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

const mapStateToProps = state => ({
  chats: state.chats.chatList,
  activeChat: state.chats.activeChat,
  isSocketConnected: state.socket.isSocketConnected,
});

ChatListScreen.propTypes = {
  chats: PropTypes.array.isRequired,
  fetchChats: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { fetchChats, setActiveChat })(ChatListScreen);
