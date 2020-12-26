import styled from 'styled-components';
import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import { colors } from '../../../constants';
import { ContentWrapper as GlobalContentWrapper } from '../../../components';


export const ContentWrapper = styled(GlobalContentWrapper)`
  padding-horizontal: ${scale(27)};
  padding-vertical: ${verticalScale(35)};
  background-color: ${colors.secondaryBackgroundColor};
`;
