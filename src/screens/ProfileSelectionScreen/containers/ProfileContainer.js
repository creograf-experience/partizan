import React from 'react';

import {
  ProfileWrapper,
  AvatarNameWrapper,
  ProfileAvatarWrapper,
} from '../components';
import { ContentText } from '../../../components';
import { CheckboxContainer } from './CheckboxContainer';


export const ProfileContainer = ({ avatarName, avatarImage, isCheckMarkVisible, onProfileSelection, avatarId }) => (
  <ProfileWrapper>
    <AvatarNameWrapper>
      <ContentText>
        {avatarName}
      </ContentText>
    </AvatarNameWrapper>
    <ProfileAvatarWrapper
      source={{ uri: avatarImage }}
    >
      <CheckboxContainer
        checkMarkVisible={isCheckMarkVisible(avatarName)}
        onChoice={onProfileSelection}
        avatarName={avatarName}
        avatarId={avatarId}
      />
    </ProfileAvatarWrapper>
  </ProfileWrapper>
);
