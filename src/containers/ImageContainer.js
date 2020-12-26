import React from 'react';
import Image from 'react-native-remote-svg';
import PropTypes from 'prop-types';

import { ImageWrapper } from '../components';
import logoImage from '../../assets/images/logoImage1.png';


const images = {
  logoImage,
};

export const ImageContainer = ({ name, width, height }) => (
  <ImageWrapper>
    <Image
      source={images[name]}
      style={{
        width,
        height,
      }}
    />
  </ImageWrapper>
);

ImageContainer.propTypes = {
  name: PropTypes.oneOf(['logoImage']).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
