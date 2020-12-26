import styled from 'styled-components';
import { scale } from 'react-native-size-matters';
import { colors } from "../../../constants";


export const ProfileWrapper = styled.View`
  width: 100%;
  background-color: ${colors.primaryBackgroundColor};
  aspect-ratio: 1;
  margin-bottom: ${scale(50)}
`;
