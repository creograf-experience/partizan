import React from 'react';
import { View } from 'react-native'
import PropTypes from 'prop-types';

import Button from './Button';

function ButtonsIfPartizan({ onSendMessagePress }) {
  return(
    <View>
      <Button
        title="Написать анонимно"
        onPress={onSendMessagePress}
      />
    </View>
  );
}

ButtonsIfPartizan.propTypes = {
  onSendMessagePress: PropTypes.func.isRequired
};

export default ButtonsIfPartizan;
