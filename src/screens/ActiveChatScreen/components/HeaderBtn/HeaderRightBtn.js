import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from 'react-native';

import api from '../../../../networkers';

import { toggleChatBlock, activeChatWithDefaulValue } from '../../../../actions';

class HeaderRightBtn extends PureComponent {
  render() {
    const { activeChat } = this.props;

    if (!activeChat._id) return null;

    return (
      <TouchableOpacity
        onPress={activeChat.isBlocked ? this.showUnblockAlert : this.showBlockAlert}
        style={styles.btn}
      >
        <Image
          source={require('../../../../../assets/icons/block.png')}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    );
  }

  showBlockAlert = () => ( 
    Alert.alert(
      'Заблокировать',
      'Вы действительно хотите заблокировать пользователя, чтобы он не смог отправлять вам сообщения?',
      [
        { text: 'Заблокировать', onPress: this.toggleBlock },
        { text: 'Нет', style: 'cancel' }
      ],
      { cancelable: false }
    )
  )

  showUnblockAlert = () => ( 
    Alert.alert(
      'Разблокировать',
      'Вы действительно хотите разблокировать этого пользователя?',
      [
        { text: 'Разблокировать', onPress: this.toggleBlock },
        { text: 'Нет', style: 'cancel' }
      ],
      { cancelable: false }
    )
  )

  showPermaBanAlert = () => ( 
    Alert.alert(
      'Пожаловаться',
      'Вы можете пожаловаться на этого пользователя',
      [
        { text: 'Пожаловаться', onPress: this.handlePermaBanAlertOnPress },
        { text: 'Нет', style: 'cancel' }
      ],
      { cancelable: true }
    )
  )

  handlePermaBanAlertOnPress = async () => {
    try {
      const { activeChat } = this.props;

      await api.chats.permaBan({
        userPhone: activeChat.userPhone,
        mirrorPhone: activeChat.mirrorPhone,
        chatId: activeChat._id
      });

    } catch (err) {
      console.warn(err);
    }
  }

  toggleBlock = () => {
    const { toggleChatBlock, activeChat } = this.props;

    toggleChatBlock({ chatId: activeChat._id, mirrorId: activeChat.mirrorId });

    !activeChat.isBlocked && this.showPermaBanAlert();
  }
}

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
  },
});

const mapStateToProps = state => ({
  activeChat: activeChatWithDefaulValue(state),
});

HeaderRightBtn.propTypes = {
  activeChat: PropTypes.object,
  toggleChatBlock: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { toggleChatBlock })(HeaderRightBtn);
