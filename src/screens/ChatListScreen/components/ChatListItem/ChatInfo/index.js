import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';

import LatestMessageDate from './LatestMessageDate';
import LatestMessage from './LatestMessage';
import ChatSenderName from './ChatSenderName';
import NotificationMark from './NotificationMark';

const ChatInfo = ({ chat }) => {
  return (
    <View style={styles.container}>
      <View style={styles.nameDateRow}>
        <ChatSenderName name={chat.withWho} />
        { chat.latestMessage && <LatestMessageDate date={chat.latestMessage.createdAt} /> }
      </View>

      <View style={styles.messageNotificationRow}>
        {
          chat.latestMessage
            ? <LatestMessage content={chat.latestMessage.content} />
            : <Text style={styles.emptyChat}>Нет Сообщений</Text>
          }
        {
          chat.notificationCount > 0
            ? <NotificationMark count={chat.notificationCount}/>
            : null
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  nameDateRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },

  messageNotificationRow: {
    flexDirection: 'row'
  },

  emptyChat: {
    fontStyle: 'italic',
    fontSize: 16,
  },
});

ChatInfo.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default ChatInfo;
