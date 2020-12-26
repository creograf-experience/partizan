import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function ProfileTypeHeader({ title, containerStyle }) {
  return(
    <View style={[
      { marginBottom: 20 },
      containerStyle
    ]}>
      <Text style={{
        fontSize: 19,
        fontWeight: 'bold'
      }}>
        {title}
      </Text>
    </View>
  );
}

ProfileTypeHeader.propTypes = {
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.object
};

export default ProfileTypeHeader;
