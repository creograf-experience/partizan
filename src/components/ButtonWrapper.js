import styled from 'styled-components';
import {
  scale,
  verticalScale,
} from 'react-native-size-matters';

import { colors } from '../constants';


export const ButtonWrapper = styled.TouchableOpacity`
  padding-vertical: ${verticalScale(15)};
  background-color: ${colors.primaryBackgroundColor};
`;

export const PrimaryButtonWrapper = styled(ButtonWrapper)`
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 10;
`;

export const SecondaryButtonWrapper = styled(ButtonWrapper)`
  padding-horizontal: ${scale(30)};
  border-style: solid;
  border-width: 0.5;
  border-color: ${colors.borderColor};
  align-self: center;
`;

export const HeaderButtonWrapper = styled.TouchableOpacity`
  padding-horizontal: ${scale(7)};
  background-color: ${colors.primaryBackgroundColor};
  padding-vertical: ${scale(4)}
`;

export const ProfileHeaderButtonWrapper = styled.TouchableOpacity`
  padding-left: ${scale(7)};
  padding-right: ${scale(31)};
  background-color: ${colors.profileHeaderColor};
  padding-top: ${scale(4)}
`;

export const ProfileRightHeaderButtonWrapper = styled.TouchableOpacity`
  padding-left: ${scale(31)};
  background-color: ${colors.profileHeaderColor};
  padding-top: ${scale(4)}
`;
