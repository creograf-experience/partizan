import React from 'react';
import {
  Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import searchIcon from '../../../../assets/icons/searchIcon.png';
import {
  SearchIconWrapper,
} from '../components';


export const SearchIcon = ({ height, width }) => (
  <SearchIconWrapper>
    <Image
      source={searchIcon}
      style={{ height, width }}
    />
  </SearchIconWrapper>
);

SearchIcon.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

SearchIcon.defaultProps = {
  height: verticalScale(15),
  width: scale(15),
};
