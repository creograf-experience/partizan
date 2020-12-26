import styled from 'styled-components';
import {
  scale,
} from 'react-native-size-matters';

import { colors } from '../../../constants';


export const CheckboxWrapper = styled.TouchableOpacity`
  height: ${scale(35)};
  width: ${scale(35)};
  margin-left: ${scale(10)};
  margin-top: ${scale(10)};
  border-width: 2;
  border-radius: 7;
  align-items: center;
  justify-content: center;
  border-color: ${colors.profileCheckboxColor}
`;
