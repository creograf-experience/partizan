import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

import Input from './Input';

function InputBox({ firstName, lastName, handleStateChange }) {
  return(
    <View style={{justifyContent: 'center', flex: 1}}>
      <Input
        placeholder="Фамилия"
        value={lastName}
        onChangeText={handleStateChange('lastName')}
      />
      <Input
        placeholder="Имя"
        value={firstName}
        onChangeText={handleStateChange('firstName')}
      />
    </View>
  );
}

InputBox.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  handleStateChange: PropTypes.func.isRequired,
};

export default InputBox;
