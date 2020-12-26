import styled from 'styled-components';
import {
  scale,
} from 'react-native-size-matters';

import { colors } from '../../../constants';


export const CheckboxIconBorder = styled.TouchableOpacity`
  height: ${scale(20)};
  width: ${scale(20)};
  border-width: 1;
  border-radius: 7;
  align-items: center;
  justify-content: center;
  border-color: ${colors.secondaryBorderColor}
`;
