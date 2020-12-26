import styled from 'styled-components';
import {
  verticalScale,
} from 'react-native-size-matters';


export const DetailsWrapper = styled.View`
  padding-vertical: ${verticalScale(30)};
  justify-content: space-between; 
  flex: 1;
`;
