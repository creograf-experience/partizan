import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Image } from 'react-native';

import { toggleChatBlock } from '../../../../actions';

const UnblockBtn = ({ chat, toggleChatBlock }) => (
  <View>
    <TouchableOpacity
      onPress={() => toggleChatBlock({ chatId: chat._id, mirrorId: chat.mirrorId })}
    >
      <Image
        source={require('../../../../../assets/icons/trash-can.png')}
        style={{ width: 30, height: 30 }}
      />
    </TouchableOpacity>
  </View>
);

UnblockBtn.propTypes = {
  chat: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    mirrorId: PropTypes.string.isRequired,
  }).isRequired,
  toggleChatBlock: PropTypes.func.isRequired,
};

export default connect(null, { toggleChatBlock })(UnblockBtn);