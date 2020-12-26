import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const ChatSenderName = ({ name }) => (
  <View style={styles.container}>
    <Text style={styles.senderName}>
      {renderName(name)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  senderName: {
    fontSize: 14,
  },
});

ChatSenderName.propTypes = {
  name: PropTypes.object.isRequired,
};

export default ChatSenderName;

const renderName = name => (
  name.fake
    ? `${name.fake.profile.name} - ${name.fake.generatedNum}`
    : name.contactName
);
