import React from 'react';
import PropTypes from 'prop-types';
import { View, ActivityIndicator } from 'react-native';

const Spinner = ({ style, size, color }) => (
  <View style={style}>
    <ActivityIndicator size={size} color={color} />
  </View>
);

Spinner.defaultProps = {
  style: { flex: 1, justifyContent: 'center' },
  size: 'large',
  color: 'black',
};

Spinner.propTypes = {
  style: PropTypes.object,
  size: PropTypes.string,
  color: PropTypes.string,
};

export default Spinner;
