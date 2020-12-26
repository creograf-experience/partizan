import React from 'react';

import { ImageContainer } from '../../../containers';
import { LogoWrapper } from '../components';


export const LogoContainer = () => (
  <LogoWrapper>
    <ImageContainer
      width={300}
      height={55}
      name="logoImage"
    />
  </LogoWrapper>
);
