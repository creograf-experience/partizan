import styled from 'styled-components';
import {
  scale,
} from 'react-native-size-matters';

import { colors } from '../../../constants';

export const CheckboxIconRound = styled.View`
  height: ${(10)};
  width: ${scale(10)};
  background-color: ${colors.checkMarkColor};
  border-radius: 50;
`;
