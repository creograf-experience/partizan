import styled from 'styled-components';
import {
  verticalScale,
  scale,
} from 'react-native-size-matters';

import {
  colors,
} from '../../../constants';


export const ModalWrapper = styled.View`
  flex: 1;
  margin-vertical: ${verticalScale(190)};
  margin-horizontal: ${scale(15)};
  justify-content: space-evenly;
  background-color: ${colors.primaryBackgroundColor};
  border-radius: ${scale(5)};
  padding-top: ${verticalScale(10)};
`;

export const ModalTopWrapper = styled.View`
  flex: 4;
  justify-content: space-evenly;
  align-items: center;
`;

export const ModalBottomWrapper = styled.View`
  flex: 1;
  flex-direction: row;  
`;
