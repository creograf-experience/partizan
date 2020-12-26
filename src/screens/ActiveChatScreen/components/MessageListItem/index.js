import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  View,
  StyleSheet,
} from 'react-native';

import Avatar from './Avatar';
import MessageBox from './MessageBox';
import MessageHistoryDate from './MessageHistoryDate';

import shouldGroupSameDateMsg from '../../../../utils/shouldGroupSameDateMsg';

class MessageListItem extends PureComponent {
  render() {
    const {
      message,
      index,
      messagesList,
      chat,
      user,
    } = this.props;

    const prevMessage = messagesList[index - 1];

    return (
      <>
        <MessageHistoryDate
          date={ message.createdAt }
          index={ index }
          messagesList={ messagesList }
        />
        <View style={ styles.container(message.from, user.phone)}>
          {
            chat.withWho.fake && message.from !== user.phone
              ? shouldGroupSameDateMsg(message, prevMessage)
                  ? <Avatar photo={ null } />
                  : <Avatar photo={ chat.withWho.fake.profile.avatar } />
              : null
          }
          <MessageBox
            message={ message }
            index={ index }
            messagesList={ messagesList }
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: (msgFrom, userPhone) => ({
    flexDirection: 'row',
    justifyContent: msgFrom === userPhone
      ? 'flex-end'
      : 'flex-start',
    marginHorizontal: 10,
  }),
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

MessageListItem.propTypes = {
  user: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
  message: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  messagesList: PropTypes.array.isRequired,
  chat: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(MessageListItem);
