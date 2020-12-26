import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-navigation';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import { ScreenOrientation } from 'expo';

class ImageFullScreen extends PureComponent {
  static navigationOptions = ({ navigation }) => {
    if (navigation.state.params.hideUI) return { header: null };

    return {
      title: 'Фотография',
      headerTitleStyle: { color: 'white' },
      headerBackImage: (
        <Image
          source={require('../../../assets/icons/back-white.png')}
          style={{ width: 30, height: 30 }}
        />
      ),
      headerTransparent: true,
      headerStyle: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
    };
  }

  componentDidMount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
  }

  componentWillUnmount() {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }

  render() {
    const { navigation } = this.props;

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <StatusBar hidden />
        <TouchableWithoutFeedback onPress={() =>
          navigation.setParams({
            hideUI: navigation.state.params.hideUI ? !navigation.state.params.hideUI : true
          })
        }>
          <Image 
            source={{ uri: navigation.getParam('image') }}
            style={{ flex: 1 }}
            resizeMode="contain"
          />
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }
}

ImageFullScreen.propTypes = {
  navigation: PropTypes.shape({
    setParams: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
  }).isRequired,
};

export default ImageFullScreen;
