import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';

export const CountryLineWrapper = styled.TouchableOpacity`
  width: 100%;
  height: ${scale(50)};
  border-top-width: ${scale(0.25)};
  border-color: ${colors.borderColor};
  padding-horizontal: ${scale(10)};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
