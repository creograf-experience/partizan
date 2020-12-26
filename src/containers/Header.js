import React from 'react';

import PropTypes from 'prop-types';
import {
  SecondaryHeaderWrapper,
  PrimaryHeaderWrapper,
  HeaderSecondaryText,
  ProfileHeaderWrapper,
  TitleText,
  ContentText,
} from '../components';
import { Button } from './Button';


const headerTypes = {
  secondary: (text, onPress) => (
    <SecondaryHeaderWrapper>
      <Button
        text="< Назад"
        onPress={onPress}
        type="header"
      />
      <HeaderSecondaryText>
        {text}
      </HeaderSecondaryText>
    </SecondaryHeaderWrapper>
  ),

  primary: (text, onPress) => (
    <PrimaryHeaderWrapper>
      <Button
        text="< Назад"
        onPress={onPress}
        type="header"
      />
      <TitleText>
        {text}
      </TitleText>
    </PrimaryHeaderWrapper>
  ),
  profiles: (text, onPress) => (
    <ProfileHeaderWrapper>
      <ContentText>
        {text}
      </ContentText>
      <Button
        text="Готово"
        onPress={onPress}
        type="profileRightHeader"
      />
    </ProfileHeaderWrapper>
  ),

};

export const Header = ({
  type,
  text,
  onPress,
}) => headerTypes[type](text, onPress);

Header.propTypes = {
  type: PropTypes.oneOf(['primary', 'secondary', 'profiles']),
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  leftOnPress: PropTypes.func,
  rightOnPress: PropTypes.func,
};

Header.defaultProps = {
  type: 'primary',
};
