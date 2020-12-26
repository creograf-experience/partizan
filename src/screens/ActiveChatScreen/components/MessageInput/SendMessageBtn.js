import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import uuidv4 from 'uuid/v4';
import {
  TouchableOpacity,
  StyleSheet,
  Image
} from 'react-native';

import {
  updateMessages,
  sendChatToServer,
  sendMessageToServer,
  updateMessagesChatId,
  clearVoiceMessage
} from '../../../../actions';

class SendMessageBtn extends PureComponent {
  state = {
    queueMessages: [],
    isWaitingForChat: false,
  }

  componentDidUpdate(prevProps) {
    const { chat, sendMessageToServer, updateMessagesChatId } = this.props;
    const { queueMessages } = this.state;

    if (chat._id && !prevProps.chat._id) {
      updateMessagesChatId(chat._id);

      queueMessages.length && queueMessages.map(message =>
        sendMessageToServer(
          this.createSocketMessageObject(message)
        )
      );

      this.setState({ queueMessages: [] });
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.sendMessage} style={styles.inputBtn}>
        <Image
          source={require('../../../../../assets/icons/sent-mail.png')}
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
    );
  }

  sendMessage = () => {
    const { isWaitingForChat } = this.state;
    const {
      chat,
      resetContent,
      updateMessages,
      sendChatToServer,
      sendMessageToServer,
      setShouldScroll,
      clearVoiceMessage
    } = this.props;

    if (!this.validateNewMessageData()) return;

    const newMessage = this.createNewMessage();

    if (!chat._id && isWaitingForChat) {
      this.addMessageToQueue(newMessage);
    }

    if (!chat._id && !isWaitingForChat) {
      sendChatToServer(
        this.createSocketChatObject()
      );
      this.setState({ isWaitingForChat: true });
    }

    chat._id && sendMessageToServer(
      this.createSocketMessageObject(newMessage)
    );

    clearVoiceMessage();
    setShouldScroll(true);
    updateMessages(newMessage);
    resetContent();
  }

  addMessageToQueue = message => {
    const { queueMessages } = this.state;
    this.setState({ queueMessages: message, ...queueMessages });
  };

  createSocketMessageObject = message => {
    const { chat } = this.props;

    return {
      chatId: chat._id,
      uuid: message._id,
      mirrorId: chat.mirrorId,
      message: message.content.message && message.content.message,
      attachment: message.content.attachments
    };
  };

  createSocketChatObject = () => {
    const {
      message,
      contactName,
      contactPhone,
    } = this.props;

    return {
      content: {
        message: (message && message).trim(),
        attachment: this.buildAttachment(),
      },
      receiver: {
        phone: contactPhone,
        contactName,
      },
    };
  };

  createNewMessage = () => {
    const { user, message, chat } = this.props;

    return {
      _id: uuidv4(),
      from: user.phone,
      chatId: chat && chat._id ? chat._id : null,
      createdAt: Date.now(),
      content: {
        message: (message && message).trim(),
        attachments: this.buildAttachment(),
      },
    };
  };

  buildAttachment = () => {
    const image = this.attachImage();
    const voiceMessage = this.attachVoiceMessage();
    return image || voiceMessage;
  };

  attachImage = () => {
    const { image } = this.props;
    return image && { photo: `data:image/jpg;base64,${image.base64}` };
  };

  attachVoiceMessage = () => {
    const { recording } = this.props;
    return recording && { voiceMessage: recording };
  };

  validateNewMessageData = () => {
    const { message, image, recording } = this.props;
    if ((image || message) && recording) return false;

    return message.trim() !== '' || image || recording;
  }
}

const styles = StyleSheet.create({
  inputBtn: {
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

const mapStateToProps = state => ({
  user: state.auth.user,
});

SendMessageBtn.propTypes = {
  chat: PropTypes.object.isRequired,
  message: PropTypes.string,
  user: PropTypes.shape({
    phone: PropTypes.string.isRequired,
  }).isRequired,
  resetContent: PropTypes.func.isRequired,
  updateMessages: PropTypes.func.isRequired,
  sendChatToServer: PropTypes.func.isRequired,
  sendMessageToServer: PropTypes.func.isRequired,
  setShouldScroll: PropTypes.func.isRequired,
  image: PropTypes.shape({
    base64: PropTypes.string.isRequired,
  }),
  contactName: PropTypes.string,
  contactPhone: PropTypes.string,
  recording: PropTypes.string
};

export default connect(
  mapStateToProps,
  {
    updateMessages,
    sendChatToServer,
    sendMessageToServer,
    updateMessagesChatId,
    clearVoiceMessage
  }
)(SendMessageBtn);
