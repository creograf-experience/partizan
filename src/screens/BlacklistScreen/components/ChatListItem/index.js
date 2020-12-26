import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';

import UnblockBtn from './UnblockBtn';
import ContactName from './ContactName';

const ChatListItem = ({ chat }) => (
  <View style={styles.container}>
    <ContactName name={chat.withWho} />
    <UnblockBtn chat={chat} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#a4a4a4',
  },
});

ChatListItem.propTypes = {
  chat: PropTypes.object.isRequired,
};

export default ChatListItem;
