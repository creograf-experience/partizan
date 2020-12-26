import React from 'react';
import {
  Linking,
  Alert,
} from 'react-native';

import { HyperText } from '../../../components';
import { urls } from '../../../constants';
import { AgreementReferenceWrapper } from '../components';


export const AgreementReference = () => (
  <AgreementReferenceWrapper
    onPress={() => {
      const url = urls.termsOfUse;
      Linking.openURL(url).catch(() => {
        Alert.alert('Ошибка подключения');
      });
    }}
  >
    <HyperText>
      пользовательского соглашения
    </HyperText>
  </AgreementReferenceWrapper>
);
