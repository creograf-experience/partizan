import React from 'react';
import { connect } from 'react-redux';
import { TouchableOpacity, Image, Platform } from 'react-native';
import { Audio } from 'expo-av';
import * as Permissions from 'expo-permissions';
import * as FileSystem from 'expo-file-system';
import PropTypes from 'prop-types';

import { clearVoiceMessage, requestSpeechToText } from '../../../../actions';

const recordingOptions = {
  android: {
    extension: '.m4a',
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
  },

  ios: {
    extension: '.wav',
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  }
}

class MicrophoneBtn extends React.Component {
  recording = null;

  render() {
    return(
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignSelf: 'center'
        }}
        onPressIn={this.handlePressIn}
        onPressOut={this.handlePressOut}
      >
        <Image
          source={require('../../../../../assets/icons/microphone.png')}
          style={{width: 25, height: 30}}
        />
      </TouchableOpacity>
    );
  }

  async componentDidMount() {
    try {
      const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);

    } catch (err) {
      console.warn('MicrophoneBtn cDM: ', err);
    }
  }

  async componentWillUnmount() {
    if (this.recording) {
      await this.resetRecording();
    }
  }

  translateSpeechToText = async () => {
    try {
      const { uri } = await FileSystem.getInfoAsync(this.recording.getURI());
      const base64File = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64
      });

      this.props.requestSpeechToText({
        file: base64File,
        name: Platform.OS === 'ios'
          ? `${Date.now()}.wav`
          : `${Date.now()}.m4a`
      });

    } catch (err) {
      console.warn('MicrophoneBtn uploadVoiceMessage: ', err);
    }
  }

  handlePressIn = async () => {
    try {
      this.props.setIsRecording(true);

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
        playThroughEarpieceAndroid: false,
        staysActiveInBackground: false,
        shouldDuckAndroid: true
      });

      this.recording = new Audio.Recording();
      await this.recording.prepareToRecordAsync(recordingOptions);
      await this.recording.startAsync();

    } catch (err) {
      console.warn(err);
      await this.resetRecording();
      this.resetProps();
    }
  }

  handlePressOut = async () => {
    try {
      this.props.setIsRecording(false);

      await this.recording.stopAndUnloadAsync();
      const { sound, status } = await this.recording.createNewLoadedSoundAsync();

      await this.translateSpeechToText();

    } catch (err) {
      console.warn(err);
      await this.resetRecording();
      this.resetProps();
    }
  }

  deleteRecordingFile = async () => {
    try {
      const info = await FileSystem.getInfoAsync(this.recording.getURI());
      await FileSystem.deleteAsync(info.uri);

    } catch (err) {
      console.warn('MicrophoneBtn deleteRecordingFile: ', err);
    }
  }

  resetRecording = async () => {
    try {
      await this.deleteRecordingFile();
      this.recording = null;

    } catch (err) {
      console.warn('MicrophoneBtn resetRecording: ', err);
    }
  }

  resetProps = () => {
    this.props.clearVoiceMessage();
    this.props.setIsRecording(false);
  }
}

MicrophoneBtn.propTypes = {
  setIsRecording: PropTypes.func.isRequired,
  setRecording: PropTypes.func.isRequired
};

export default connect(null, {
  clearVoiceMessage,
  requestSpeechToText
})(MicrophoneBtn);
