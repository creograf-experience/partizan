import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';

function Button({ title, style, ...rest }) {
  return(
    <TouchableOpacity
      {...rest}
      style={[
        {
          borderWidth: 1,
          paddingHorizontal: 30,
          paddingVertical: 20,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5
        },
        style
      ]}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
}

Button.propTypes = {
  title: PropTypes.string.isRequired,
  style: PropTypes.object
};

export default Button;
