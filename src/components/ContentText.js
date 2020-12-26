import styled from 'styled-components';
import { scale } from 'react-native-size-matters';

import { colors } from '../constants';


export const ContentText = styled.Text`
  font-size: ${scale(15)};
`;

export const PrimaryText = styled(ContentText)`
  color: ${colors.primaryTextColor};
`;

export const SecondaryText = styled(ContentText)`
  color: ${colors.secondaryTextColor};
`;

export const TitleText = styled(SecondaryText)`
  font-size: ${scale(23)};
`;

export const HeaderSecondaryText = styled(TitleText)`
  color: ${colors.primaryTextColor};
  padding-left: ${scale(18)};
`;

export const HintText = styled(PrimaryText)`
  font-size: ${scale(12)};
`;

export const TextButtonText = styled(PrimaryText)`
  text-decoration: underline;
`;

export const HyperText = styled(TextButtonText)`
  color: ${colors.hyperTextColor};
`;

export const SearchLineText = styled(ContentText)`
  color: ${colors.searchLineTextColor};
`;
