import React from 'react';
import PropTypes from 'prop-types';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

const Avatar = ({ photo }) => (
  <View>
    <Image
      source={ photo ? { uri: photo } : null }
      style={styles.avatar}
      resizeMethod="resize"
    />
  </View>
);

const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 5,
  },
});

Avatar.propTypes = {
  photo: PropTypes.string,
};

export default Avatar;
