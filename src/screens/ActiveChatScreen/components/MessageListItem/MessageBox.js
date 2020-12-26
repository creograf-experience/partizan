import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';

import { deleteMessage } from '../../../../actions';

import shouldGroupSameDateMsg from '../../../../utils/shouldGroupSameDateMsg';
import formatMessageDate from '../../../../utils/formatMessageDate';

import MessageContent from './MessageContent';

const MessageBox = ({ message, messagesList, index, user, deleteMessage }) => {
  const prevMessage = messagesList[index - 1];

  return (
    <View style={styles.messageBox}>
      {
        shouldGroupSameDateMsg(message, prevMessage)
          ? null
          : <Text style={styles.messageDate(message.from, user.phone)}>
              { formatMessageDate(message.createdAt) }
            </Text>
      }
      <TouchableWithoutFeedback
        onLongPress={() => Alert.alert(
          'Удалить',
          'Вы действительно хотите удалить сообщение?',
          [
            { text: 'Удалить', onPress: () => deleteMessage({ chatId: message.chatId, _id: message._id })},
            { text: 'Нет', style: 'cancel' }
          ],
          { cancelable: true }
        )}
      >
        <View>
          <MessageContent message={ message } />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  messageBox: {
    maxWidth: '80%',
    margin: 5,
  },

  messageDate: (msgFrom, userPhone) => ({
    textAlign: msgFrom === userPhone ? 'right' : 'left',
    color: '#a4a4a4',
    fontSize: 11,
    fontStyle: 'italic',
  }),
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

MessageBox.propTypes = {
  user: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.object.isRequired,
  messagesList: PropTypes.array.isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, { deleteMessage })(MessageBox);
