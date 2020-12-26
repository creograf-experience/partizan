import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';

import Rating from './Rating';

function Avatar({ ratingValue }) {
  return(
    <View style={{
      flexDirection: 'row',
      marginBottom: 20,
      paddingHorizontal: 40
    }}>
      <Image
        source={require('../../../../assets/images/chat-logo.png')}
        style={{width: 95, height: 95, borderRadius: 50}}
      />

      {
        ratingValue > 0 &&
          <View style={{
            position: 'absolute',
            top: 0,
            right: 0
          }}>
            <Rating value={ratingValue} />
          </View>
      }
    </View>
  );
}

Avatar.propTypes = {
  ratingValue: PropTypes.number
};

export default Avatar;
