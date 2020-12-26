import styled from 'styled-components';
import {
  scale,
} from 'react-native-size-matters';

import { colors } from '../../../constants';

export const CheckboxIconRound = styled.View`
 
  height: ${scale(25)};
  width: ${scale(25)};
  background-color: ${colors.profileCheckboxColor};
  border-radius: 50;
`;
