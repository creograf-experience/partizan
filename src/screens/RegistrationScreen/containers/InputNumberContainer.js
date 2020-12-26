import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

import {
  InputNumberWrapper,
  NumberWrapper,
  CountryTelephoneMaskWrapper,
  PhoneNumberWrapper,
} from '../components';
import { ContentText } from '../../../components';
import { ChosenCountryContainer } from '.';


export const InputNumberContainer = ({
                                       makeModalVisible,
                                       countryName,
                                       callingCode,
                                       flag,
                                       onChangeTelephoneNumber,
                                     }) => (
  <TouchableWithoutFeedback onPress={() => (Keyboard.dismiss())}>
    <InputNumberWrapper>
      <ChosenCountryContainer
        makeModalVisible={makeModalVisible}
        countryName={countryName}
        flag={flag}
      />
      <NumberWrapper>
        <CountryTelephoneMaskWrapper
          onPress={makeModalVisible}
        >
          <ContentText>
            {callingCode}
          </ContentText>
        </CountryTelephoneMaskWrapper>
        <PhoneNumberWrapper
          maxLength={18}
          placeholder="9999999999"
          placeholderTextColor="grey"
          selectionColor="grey"
          keyboardType="phone-pad"
          onChangeText={text => onChangeTelephoneNumber(text)}
        />
      </NumberWrapper>
    </InputNumberWrapper>
  </TouchableWithoutFeedback>
);
