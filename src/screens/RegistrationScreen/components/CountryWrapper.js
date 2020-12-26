import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';

export const CountryWrapper = styled.TouchableOpacity`
  width: 100%;
  height: ${scale(40)};
  background-color: ${colors.primaryBackgroundColor};
  align-items: center;
  flex-direction: row;
  padding-horizontal: ${scale(15)};
  border-radius: 10;
`;
