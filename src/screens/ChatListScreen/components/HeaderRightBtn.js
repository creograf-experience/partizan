import React from 'react';
import PropTypes from 'prop-types';
import { withNavigation } from 'react-navigation';
import {
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { CONTACTS_SCREEN } from '../../../constants';

const HeaderRightBtn = ({ navigation }) => (
  <TouchableOpacity
    onPress={() => navigation.navigate(CONTACTS_SCREEN)}
    style={styles.btn}
  >
    <Image
      source={require('../../../../assets/icons/plus.png')}
      style={{ width: 30, height: 30 }}
    />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  btn: {
    marginRight: 10,
  },
});

HeaderRightBtn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default withNavigation(HeaderRightBtn);
