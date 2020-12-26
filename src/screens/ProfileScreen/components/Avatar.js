import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

function Avatar({ imgSrc }) {
  return(
    <View style={{marginRight: 20}}>
      <Image
        source={{uri: imgSrc}}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50
        }}
      />
    </View>
  );
}

Avatar.propTypes = {
  imgSrc: PropTypes.string.isRequired
};

export default Avatar;
