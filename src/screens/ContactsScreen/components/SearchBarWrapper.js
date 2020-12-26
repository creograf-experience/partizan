import styled from 'styled-components';
import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import {
  colors,
} from '../../../constants';


export const SearchBarWrapper = styled.View`
  height: ${verticalScale(50)};
  border-color: ${colors.borderColor};
  border-style: solid;
  border-width: 1;
  border-radius: ${scale(30)};
  margin-vertical: ${verticalScale(20)};
  margin-horizontal: ${scale(15)};
  padding-right: ${scale(20)};
  flex-direction: row;
`;
