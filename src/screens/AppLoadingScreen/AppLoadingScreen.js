import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { AsyncStorage } from 'react-native';
import { Asset } from 'expo-asset';

import { connectSocket } from '../../actions';

import { ActivityIndicatorContainer } from './containers';
import { ContentWrapper } from './components';
import { TAB_NAVIGATOR, WELCOME_SCREEN } from '../../constants';


class AppLoadingScreenComponent extends PureComponent {
  async componentDidMount() {
    // await AsyncStorage.clear();
    await this.loadAssets();
    const jwtToken = await this.getTokenFromStorage();

    const { navigation, connectSocket } = this.props;

    if (!jwtToken) {
      navigation.navigate(WELCOME_SCREEN);
      return;
    }

    connectSocket();
    navigation.navigate(TAB_NAVIGATOR)
  }

  getTokenFromStorage = async () => {
    try {
      return await AsyncStorage.getItem('token');

    } catch (error) {
      console.warn(error);
    }
  };

  loadAssets = async () => {
    await Asset.loadAsync([
      require('../../../assets/images/logoImage1.png'),
      require('../../../assets/images/chat-logo.png'),
      require('../../../assets/icons/back-white.png'),
      require('../../../assets/icons/back.png'),
      require('../../../assets/icons/block.png'),
      require('../../../assets/icons/chat.png'),
      require('../../../assets/icons/close.png'),
      require('../../../assets/icons/friends.png'),
      require('../../../assets/icons/photo-camera.png'),
      require('../../../assets/icons/plus.png'),
      require('../../../assets/icons/searchIcon.png'),
      require('../../../assets/icons/sent-mail.png'),
      require('../../../assets/icons/settings.png'),
      require('../../../assets/icons/user.png'),
      require('../../../assets/icons/trash-can.png'),
      require('../../../assets/icons/microphone.png'),
      require('../../../assets/icons/cancel-voice-message.png'),
      require('../../../assets/icons/play-icon.png'),
      require('../../../assets/icons/play-icon-white.png'),
      require('../../../assets/icons/pause-icon.png'),
      require('../../../assets/icons/pause-icon-white.png'),
      require('../../../assets/icons/star.png'),
      require('../../../assets/icons/star-filled.png'),
      require('../../../assets/icons/checkmark.png'),
    ]);
  };

  render() {
    return (
      <ContentWrapper>
        <ActivityIndicatorContainer />
      </ContentWrapper>
    );
  }
}

export default connect(null, { connectSocket })(AppLoadingScreenComponent);
