import React from 'react';
import { View, TextInput } from 'react-native';
import PropTypes from 'prop-types';

function Input({ onChangeText, ...rest }) {
  return(
    <View style={{borderBottomWidth: 1, borderBottomColor: '#BDC3C7'}}>
      <TextInput
        style={{paddingVertical: 5, fontSize: 17}}
        {...rest}
        onChangeText={text => {
          if (!validateInput(text) && text.length) return;
          onChangeText(text);
        }}
      />
    </View>
  );
}

Input.propTypes = {
  onChangeText: PropTypes.func.isRequired
};

export default Input;

function validateInput(text) {
  const allowedCharacters = /^[а-яА-ЯЁёa-zA-Z]+$/;
  return allowedCharacters.test(text);
}

