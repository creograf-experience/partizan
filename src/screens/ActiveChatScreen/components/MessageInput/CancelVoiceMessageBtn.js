import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

function CancelVoiceMessageBtn({ onPress }) {
  return(
    <TouchableOpacity
      style={{
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center'
      }}
      onPress={onPress}
    >
      <Image
        source={require('../../../../../assets/icons/cancel-voice-message.png')}
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );
}

CancelVoiceMessageBtn.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default CancelVoiceMessageBtn;
