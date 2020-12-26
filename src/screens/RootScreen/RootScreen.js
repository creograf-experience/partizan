import React, { PureComponent } from 'react';
import { AsyncStorage } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { connectSocket } from '../../actions';

import RootNavigator from '../../routes';

class RootScreen extends PureComponent {
  async componentDidUpdate(prevProps) {
    const { isSocketConnected, connectSocket } = this.props;
    if (prevProps.isSocketConnected && !isSocketConnected) {
      if (!await AsyncStorage.getItem('token')) return;
      connectSocket();
    }
  }

  render() {
    return (
      <RootNavigator />
    );
  }
}

const mapStateToProps = state => ({
  isSocketConnected: state.socket.isSocketConnected,
});

RootScreen.propTypes = {
  connectSocket: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { connectSocket })(RootScreen);
