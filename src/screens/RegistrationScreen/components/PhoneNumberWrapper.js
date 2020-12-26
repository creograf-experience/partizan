import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../../../constants';

export const PhoneNumberWrapper = styled.TextInput`
  padding-left: ${scale(8)}
  height: ${scale(40)};
  flex: 1;
  background-color: ${colors.primaryBackgroundColor};
  margin-left: ${scale(12)};
  border-radius: 10;
`;
