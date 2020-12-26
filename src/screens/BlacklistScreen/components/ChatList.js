import React from 'react';
import PropTypes from 'prop-types';
import { FlatList } from 'react-native';

import ChatListItem from './ChatListItem';

const ChatList = ({ chats }) => (
  <FlatList
    data={chats}
    keyExtractor={chat => chat._id}
    renderItem={({ item }) => <ChatListItem chat={item} />}
  />
);

ChatList.propTypes = {
  chats: PropTypes.array.isRequired,
};

export default ChatList;
