import React from 'react';

import {
  CheckboxWrapper,
  CheckboxIconRound,
} from '../components';


export const CheckboxContainer = ({ onChoice, checkMarkVisible, avatarName, avatarId }) => (
  <CheckboxWrapper
    activeOpacity={1}
    onPress={() => onChoice(avatarName, avatarId)}
  >
    {checkMarkVisible && <CheckboxIconRound />}
  </CheckboxWrapper>
);
