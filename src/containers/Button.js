import React from 'react';
import PropTypes from 'prop-types';

import {
  PrimaryButtonWrapper,
  SecondaryButtonWrapper,
  HeaderButtonWrapper,
  PrimaryText,
  ProfileHeaderButtonWrapper,
  ProfileRightHeaderButtonWrapper,
} from '../components';


const buttonTypes = {
  primary: (text, onPress, disabled) => (
    <PrimaryButtonWrapper
      onPress={onPress}
      disabled={disabled}
    >
      <PrimaryText>
        {text}
      </PrimaryText>
    </PrimaryButtonWrapper>
  ),

  secondary: (text, onPress, disabled) => (
    <SecondaryButtonWrapper
      onPress={onPress}
      disabled={disabled}
    >
      <PrimaryText>
        {text}
      </PrimaryText>
    </SecondaryButtonWrapper>
  ),

  header: (text, onPress) => (
    <HeaderButtonWrapper
      onPress={onPress}
    >
      <PrimaryText>
        {text}
      </PrimaryText>
    </HeaderButtonWrapper>
  ),

  profileHeader: (text, onPress) => (
    <ProfileHeaderButtonWrapper
      onPress={onPress}
    >
      <PrimaryText>
        {text}
      </PrimaryText>
    </ProfileHeaderButtonWrapper>
  ),

  profileRightHeader: (text, onPress) => (
    <ProfileRightHeaderButtonWrapper
      onPress={onPress}
    >
      <PrimaryText>
        {text}
      </PrimaryText>
    </ProfileRightHeaderButtonWrapper>
  ),
};


export const Button = ({
  type,
  text,
  onPress,
  disabled,
}) => buttonTypes[type](text, onPress, disabled);

Button.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'header', 'profileHeader', 'profileRightHeader']),
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

Button.defaultProps = {
  type: 'primary',
};
