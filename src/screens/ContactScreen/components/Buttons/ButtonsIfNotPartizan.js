import React from 'react';
import { View } from 'react-native'
import PropTypes from 'prop-types';

import Button from './Button';

function ButtonsIfNotPartizan({ onInvitePress, onSendMessagePress }) {
  return(
    <View>
      <Button
        title="Отправить приглашение"
        style={{marginBottom: 5}}
        onPress={onInvitePress}
      />
      <Button
        title="Написать анонимно"
        onPress={onSendMessagePress}
      />
    </View>
  );
}

ButtonsIfNotPartizan.propTypes = {
  onInvitePress: PropTypes.func.isRequired,
  onSendMessagePress: PropTypes.func.isRequired
};

export default ButtonsIfNotPartizan;
