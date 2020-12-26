import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';

export const CountryTelephoneMaskWrapper = styled.TouchableOpacity`
  height: ${scale(40)};
  padding-horizontal: 10;
  background-color: ${colors.primaryBackgroundColor};
  justify-content: center;
  border-radius: 10;
`;
