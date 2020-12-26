import React from 'react';

import { PrimaryText } from '../../../components';
import {
  CountryLineWrapper,
  CountryNameWrapper,
  CallingCodeWrapper,
  CountryAndFlagWrapper,
} from '../components';
import {FlagContainer} from './FlagContainer';

export const CountryLineContainer = ({ uri, countryName, callingCode, onCountrySelection }) => (
  <CountryLineWrapper
    onPress={() => {onCountrySelection(countryName, callingCode, uri) }}
  >
    <CountryAndFlagWrapper>
      <FlagContainer
        uri={uri}
      />
      <CountryNameWrapper>
        <PrimaryText>
          {countryName}
        </PrimaryText>
      </CountryNameWrapper>
    </CountryAndFlagWrapper>
    <CallingCodeWrapper>
      <PrimaryText>
        {callingCode}
      </PrimaryText>
    </CallingCodeWrapper>
  </CountryLineWrapper>

);
