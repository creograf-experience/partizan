import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const LatestMessage = ({ content }) => (
  <View style={{ flex: 1, justifyContent: 'center' }}>
    {
      content.attachments &&
      (content.attachments.voiceMessage || content.attachments.photo) &&
      !content.message
        ? <View>
            <Text style={styles.photo}>{lastAttachmentMessage(content.attachments)}</Text>
          </View>
        : <View>
            <Text style={styles.message}>{determineMessageLength(content)}</Text>
          </View>
    }
  </View>
);

const styles = StyleSheet.create({
  message: {
    fontSize: 18,
  },

  photo: {
    fontStyle: 'italic',
    fontSize: 16,
  },
});

LatestMessage.propTypes = {
  content: PropTypes.object.isRequired,
};

export default LatestMessage;

const lastAttachmentMessage = attachments => {
  if (attachments.photo) return 'Фотография';
  if (attachments.voiceMessage) return 'Голосовое сообщение';
};

const determineMessageLength = content => {
  const { message } = content;
  const maxLength = 19;

  return message.length < maxLength
    ? message
    : `${message.slice(0, maxLength)}...`;
};
