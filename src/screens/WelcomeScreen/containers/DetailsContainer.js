import React from 'react';
import PropTypes from 'prop-types';

import { SecondaryText } from '../../../components';
import { DetailsWrapper } from '../components';
import { CheckboxContainer } from './CheckboxContainer';


export const DetailsContainer = ({
  description,
  checkboxVisible,
  ...checkboxProps
}) => (
  <DetailsWrapper>
    <SecondaryText>
      {description}
    </SecondaryText>
    {
      checkboxVisible && (
        <CheckboxContainer
          {...checkboxProps}
        />
      )
    }
  </DetailsWrapper>
);

DetailsContainer.propTypes = {
  description: PropTypes.string.isRequired,
  checkboxVisible: PropTypes.bool.isRequired,
};
