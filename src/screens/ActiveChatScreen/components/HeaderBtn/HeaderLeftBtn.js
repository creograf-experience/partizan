import React from 'react';
import PropTypes from 'prop-types';
import {
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

const HeaderLeftBtn = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.goBack()}
    style={styles.btn}
  >
    <Image
      source={require('../../../../../assets/icons/back.png')}
      style={{ width: 30, height: 30 }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    marginLeft: 10,
  },
});

HeaderLeftBtn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default HeaderLeftBtn;
