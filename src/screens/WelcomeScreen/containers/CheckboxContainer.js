import React from 'react';
import PropTypes from 'prop-types';

import { SecondaryText } from '../../../components';
import {
  CheckboxIconWrapper,
  CheckboxWrapper,
  CheckboxDetailsWrapper,
  CheckboxIconRound,
  CheckboxIconBorder,
} from '../components';
import { AgreementReference } from './AgreementReference';


export const CheckboxContainer = ({ onCheck, checkMarkVisible }) => (
  <CheckboxWrapper>

    <CheckboxIconWrapper>
      <CheckboxIconBorder
        activeOpacity={1}
        onPress={onCheck}
      >
        {checkMarkVisible && <CheckboxIconRound />}
      </CheckboxIconBorder>
    </CheckboxIconWrapper>

    <CheckboxDetailsWrapper>
      <SecondaryText>
        Согласен с условиями
      </SecondaryText>
      <AgreementReference />
    </CheckboxDetailsWrapper>

  </CheckboxWrapper>
);

CheckboxContainer.propTypes = {
  onCheck: PropTypes.func.isRequired,
  checkMarkVisible: PropTypes.bool.isRequired,
};
