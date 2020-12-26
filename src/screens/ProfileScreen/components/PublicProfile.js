import React from 'react';
import {
  View,
  TouchableOpacity,
  Platform,
  Image,
  Alert
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';

import ProfileTypeHeader from './ProfileTypeHeader';
import Avatar from './Avatar';
import InputBox from './InputBox';

class PublicProfile extends React.Component {
  render() {
    return(
      <>
        <ProfileTypeHeader title="Публичный профиль" />
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={this.openImagePicker}>
              <Avatar imgSrc={
                this.props.image
                  ? this.props.image.uri
                  : this.props.avatarSrc
              }/>
            </TouchableOpacity>

            {
              this.props.image &&
                <TouchableOpacity 
                  style={{
                    position: 'absolute',
                    top: -15,
                    right: 15,
                    padding: 2
                  }}
                  onPress={() => this.props.handleStateChange('image')(null)}
                >
                  <Image
                    source={require('../../../../assets/icons/close.png')}
                    style={{width: 25, height: 25}}
                  />
                </TouchableOpacity>
            }
          </View>

          <InputBox
            firstName={this.props.firstName}
            lastName={this.props.lastName}
            handleStateChange={this.props.handleStateChange}
          />
        </View>
      </>
    );
  }

  openImagePicker = async () => {
    try {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          return Alert
            .alert('Нет доступа к хранилищу', 'Предоставьте доступ в настройках');
        }
      }

      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: 'Images',
        base64: true
      });

      if (image.cancelled) return;

      this.props.handleStateChange('image')(image);

    } catch (err) {
      console.error(err);
    }
  }
}

PublicProfile.propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  handleStateChange: PropTypes.func.isRequired,
  image: PropTypes.shape({
    uri: PropTypes.string.isRequired
  })
};

export default PublicProfile;
