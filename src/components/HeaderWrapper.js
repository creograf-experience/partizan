import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../constants';

export const HeaderWrapper = styled.View`
  height: ${scale(69)};
  width: 100%;
  flex-direction: row;
  padding-horizontal: ${scale(15)};
  align-items: flex-end;
  padding-vertical: ${scale(5)};
`;

export const PrimaryHeaderWrapper = styled(HeaderWrapper)`
  background-color: ${colors.secondaryBackgroundColor};
`;

export const SecondaryHeaderWrapper = styled(HeaderWrapper)`
  background-color: ${colors.primaryBackgroundColor};
`;

export const ProfileHeaderWrapper = styled(HeaderWrapper)`
  background-color: ${colors.profileHeaderColor};
  height: ${scale(60)};
  padding-left: ${scale(105)};
`;
