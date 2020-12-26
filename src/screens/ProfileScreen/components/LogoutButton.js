import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { REGISTRATION_SCREEN } from '../../../constants';
import { disconnectSocket } from '../../../actions';

import { Button } from '../../ContactScreen/components/Buttons';

function LogoutButton({ navigation, disconnectSocket }) {
  handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('token');
      disconnectSocket();
      navigation.navigate(REGISTRATION_SCREEN);

    } catch (err) {
      console.warn(err);
    }
  }

  return(
    <Button
      title="Выйти"
      onPress={handleLogout}
    />
  );
}

LogoutButton.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired,
  disconnectSocket: PropTypes.func.isRequired
};

export default withNavigation(
  connect(null, { disconnectSocket })(LogoutButton)
);
