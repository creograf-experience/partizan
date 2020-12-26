import React from 'react';
import Image from 'react-native-remote-svg';

import { FlagWrapper } from '../components';


export const FlagContainer = ({uri}) => (
  <FlagWrapper>
    <Image
      style={{width: 30, height: 20}}
      source={{uri: uri}}
    />
  </FlagWrapper>
);
