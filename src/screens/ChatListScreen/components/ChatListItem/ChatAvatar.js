import React from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

const ChatAvatar = ({ chatWithWho }) => (
  <View>
    <Image
      source={
        chatWithWho.contactName
          ? require('../../../../../assets/images/chat-logo.png')
          : { uri: chatWithWho.fake.profile.avatar }
      }
      style={styles.avatar}
    />
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
});

export default ChatAvatar;
