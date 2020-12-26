import React from 'react';
import {
  View,
  TouchableOpacity,
  Image
} from 'react-native';
import * as Speech from 'expo-speech';
import PropTypes from 'prop-types';

import AudioWave from './AudioWave';

class Recording extends React.Component {
  state = { isAnimated: false, isPlaying: false };

  render() {
    const { isAnimated, isPlaying } = this.state;
    const { color, notMyMessage } = this.props;

    return(
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <AudioWave
          isAnimated={isAnimated}
          color={color}
        />
        <TouchableOpacity
          onPress={this.handleOnPress}
          style={{ marginLeft: 10 }}
        >
          <Image
            source={
              isPlaying
                ? notMyMessage
                    ? require('../../../../../assets/icons/pause-icon-white.png')
                    : require('../../../../../assets/icons/pause-icon.png')
                : notMyMessage
                    ? require('../../../../../assets/icons/play-icon-white.png')
                    : require('../../../../../assets/icons/play-icon.png')
            }
            style={{ width: 25, height: 25 }}
          />
        </TouchableOpacity>
      </View>
    );
  }

  componentWillUnmount() {
    Speech.stop();
  }

  speak = () => {
    const { recording } = this.props;

    Speech.speak(recording, {
      language: 'ru',
      onStart: () => this.setState({ isAnimated: true, isPlaying: true }),
      onDone: () => this.setState({ isAnimated: false, isPlaying: false }),
      onStopped: () => this.setState({ isAnimated: false, isPlaying: false })
    });
  }

  handleOnPress = () => {
    if (this.state.isPlaying) {
      Speech.stop();
      return;
    }

    this.speak();
  }
}

Recording.propTypes = {
  recording: PropTypes.string,
  color: PropTypes.string,
  notMyMessage: PropTypes.bool
};

Recording.defaultProps = {
  notMyMessage: false
};

export default Recording;