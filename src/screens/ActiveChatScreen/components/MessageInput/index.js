import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  View,
  TextInput,
  StyleSheet,
  Platform
} from 'react-native';

import {
  clearVoiceMessage
} from '../../../../actions';

import Attachment from './Attachment';
import SelectPhotoBtn from './SelectPhotoBtn';
import SendMessageBtn from './SendMessageBtn';
import MicrophoneBtn from './MicrophoneBtn';
import CancelVoiceMessageBtn from './CancelVoiceMessageBtn';
import RecordTimer from './RecordTimer';
import AudioWave from './AudioWave';
import Recording from './Recording';

class MessageInput extends PureComponent {
  state = {
    message: '',
    image: null,
    isRecording: false
  };

  placeholders = {
    default: 'Сообщение...',
    blocked: 'Пользователь заблокирован. Чтобы снова написать сообщение, разблокируйте его.',
    mirrorBlocked: 'Пользователь заблокировал вас. Вы не можете ему писать.',
  };

  render() {
    const {
      message,
      image,
      isRecording
    } = this.state;
    const {
      chat,
      contactName,
      contactPhone,
      setShouldScroll,
      recording,
      isVoiceMessageLoading
    } = this.props;

    return (
      <View
        style={styles.bg}
        pointerEvents={
          chat.isBlocked 
            ? 'none'
            : chat.isMirrorBlocked
                ? 'none'
                : isVoiceMessageLoading
                    ? 'none'
                    : 'auto'
        }>

        {
          image
            ? (
              <Attachment
                image={image}
                resetAttachment={this.resetAttachment}
              />
            )
            : null
        }

        <View style={styles.container}>
          {
            isRecording
              ? <View style={{ width: '20%', justifyContent: 'center' }}>
                  <RecordTimer />
                </View>
              : recording
                  ? <View style={{ width: '15%' }}>
                      <CancelVoiceMessageBtn
                        onPress={() => this.props.clearVoiceMessage()}
                      />
                    </View>
                  : <View style={{ width: '15%' }}>
                      <SelectPhotoBtn
                        setAttachment={this.setAttachment}
                      />
                    </View>
          }

          {
            isRecording
              ? <View style={[styles.input, { justifyContent: 'center', height: 48 }]}>
                  <AudioWave />
                </View>
              : recording
                ? <View style={[styles.input, { justifyContent: 'center', height: 48 }]}>
                    <Recording recording={recording} />
                  </View>
                : isVoiceMessageLoading
                    ? <View style={[styles.input, { justifyContent: 'center', alignItems: 'center', height: 48 }]}>
                        <ActivityIndicator size="small" color="black" />
                      </View>
                    : <TextInput
                        style={styles.input}
                        placeholder={
                          chat.isBlocked
                            ? this.placeholders.blocked
                            : chat.isMirrorBlocked
                                ? this.placeholders.mirrorBlocked
                                : this.placeholders.default
                        }
                        multiline
                        value={message}
                        onChangeText={text => this.setState({ message: text })}
                        ref={ref => { 
                          this.textInputRef = ref;
                          this.props.setTextInputRef(ref);
                        }}
                      />
          }

          <View style={{ width: '15%' }}>
            {
              message.length || image || recording
                ? <SendMessageBtn
                    contactName={contactName}
                    contactPhone={contactPhone}
                    chat={chat}
                    message={message}
                    image={image}
                    recording={recording}
                    resetContent={this.resetContent}
                    setShouldScroll={setShouldScroll}
                  />
                : <MicrophoneBtn
                    setIsRecording={bool => this.setState({ isRecording: bool })}
                    setRecording={value => this.setState({ recording: value })}
                  />
            }
          </View>

        </View>
      </View>
    );
  }

  componentWillUnmount() {
    if (this.props.recording) {
      this.props.clearVoiceMessage();
    }
  }

  componentDidUpdate(prevProps) {
    const { chat } = this.props;

    if (
      prevProps.chat.isMirrorBlocked !== chat.isMirrorBlocked ||
      prevProps.chat.isBlocked !== chat.isBlocked
    ) {
      this.textInputRef.blur();
      this.setState({ message: '' });
    }
  }

  resetAttachment = () => this.setState({ image: null });
  resetContent = () => this.setState({ message: '', image: null });
  setAttachment = image => this.setState({ image });
}

const styles = StyleSheet.create({
  bg: {
    backgroundColor: 'white'
  },

  container: {
    flexDirection: 'row',
  },

  input: {
    flex: 1,

    paddingTop: Platform.OS === 'android' ? 10 : 15,
    paddingBottom: Platform.OS === 'android' ? 10 : 15,
    paddingLeft: 5,
    paddingRight: 5,

    fontSize: 15,
  },
});

MessageInput.propTypes = {
  chat: PropTypes.object.isRequired,
  setShouldScroll: PropTypes.func.isRequired,
  contactName: PropTypes.string,
  contactPhone: PropTypes.string,
  recording: PropTypes.string,
  isVoiceMessageLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  recording: state.messages.voiceMessage,
  isVoiceMessageLoading: state.messages.isVoiceMessageLoading
});

export default connect(mapStateToProps, {
  clearVoiceMessage
})(MessageInput);
