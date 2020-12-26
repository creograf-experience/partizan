import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function ProfileName({ name }) {
  return(
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text style={{fontSize: 17}}>
        {name}
      </Text>
    </View>
  );
}

ProfileName.propTypes = {
  name: PropTypes.string.isRequired
};

export default ProfileName;
