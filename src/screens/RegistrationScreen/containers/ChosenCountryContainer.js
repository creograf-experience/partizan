import React from 'react'

import { ContentText } from '../../../components';
import {
  CountryWrapper,
  CountryNameWrapper,
} from '../components';
import { FlagContainer } from './FlagContainer';


export const ChosenCountryContainer = ({countryName, flag, makeModalVisible}) => (
  <CountryWrapper
    onPress={makeModalVisible}
  >
    <FlagContainer
      uri={flag}
    />
    <CountryNameWrapper>
      <ContentText>
        {countryName}
      </ContentText>
    </CountryNameWrapper>
  </CountryWrapper>
);
