import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import {
  colors,
} from '../../../constants';


export const HeaderButtonText = styled.Text`
  flex: 1;
  color: ${colors.secondaryTextColor};
  font-size: 14;
  align-self: center;
  paddingTop: ${scale(12)};
`;
