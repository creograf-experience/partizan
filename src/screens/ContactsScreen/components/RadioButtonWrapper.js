import styled from 'styled-components';
import {
  verticalScale,
  scale,
} from 'react-native-size-matters';


export const RadioButtonWrapper = styled.ScrollView`
  flex: 1;
  width: 100%;
  margin-vertical: ${verticalScale(10)};
  font-size: 25;
`;
