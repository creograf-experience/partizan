import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';
import {
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { setActiveChat } from '../../../../actions';

import { ACTIVE_CHAT_SCREEN } from '../../../../constants';

import ChatAvatar from './ChatAvatar';
import ChatInfo from './ChatInfo';

class ChatListItem extends PureComponent {
  componentDidUpdate(prevProps) {
    const { chat, setActiveChat, activeChat } = this.props;

    if (
      activeChat &&
      activeChat._id === chat._id &&
      prevProps.chat.isMirrorBlocked !== chat.isMirrorBlocked ||
      prevProps.chat.isBlocked !== chat.isBlocked
    ) {
      setActiveChat(chat);
    }
  }

  render() {
    const { chat, navigation, setActiveChat } = this.props;

    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ACTIVE_CHAT_SCREEN, {
            header: returnName(chat.withWho),
          })
          setActiveChat(chat);
        }}
        style={styles.container(chat.notificationCount)}
      >
        <View style={styles.chatList(chat.isBlocked)}>
          <ChatAvatar chatWithWho={chat.withWho}/>
          <ChatInfo chat={chat} />
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  container: notificationCount => ({
    backgroundColor: notificationCount > 0 ? 'silver' : '#f3f3f3',
    borderBottomWidth: 1,
    borderColor: '#a4a4a4',
  }),

  chatList: isBlocked => ({
    flexDirection: 'row',
    padding: 15,
    opacity: isBlocked ? 0.5 : 1,
  }),
});

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
  setActiveChat: PropTypes.func.isRequired,
  activeChat: PropTypes.object,
};

const mapStateToProps = state => ({
  activeChat: state.chats.activeChat,
});

export default connect(mapStateToProps, { setActiveChat })(withNavigation(ChatListItem));

const returnName = name => (
  name.fake
    ? name.fake.profile.name
    : name.contactName
);
