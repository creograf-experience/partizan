import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';

import { CHANGE_ANON_PROFILE_SCREEN } from '../../../constants';

import ProfileTypeHeader from './ProfileTypeHeader';
import Avatar from './Avatar';
import ProfileName from './ProfileName';

function AnonymousProfile({ avatarSrc, profileName, navigation }) {
  return(
    <>
      <ProfileTypeHeader title="Анонимный профиль" />
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.navigate(CHANGE_ANON_PROFILE_SCREEN)}>
          <Avatar imgSrc={avatarSrc} />
        </TouchableOpacity>
        <ProfileName name={profileName} />
      </View>
    </>
  );
}

AnonymousProfile.propTypes = {
  avatarSrc: PropTypes.string.isRequired,
  profileName: PropTypes.string.isRequired,
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default withNavigation(AnonymousProfile);
