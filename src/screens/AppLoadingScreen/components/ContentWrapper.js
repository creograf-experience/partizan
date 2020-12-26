import styled from 'styled-components';
import { scale } from 'react-native-size-matters';
import { colors } from '../../../constants';


export const ContentWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${scale(15)};
  padding-vertical: ${scale(15)};
  background-color: ${colors.secondaryBackgroundColor}
`;
