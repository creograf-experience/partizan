import styled from 'styled-components';
import { scale } from 'react-native-size-matters';


export const SearchFieldWrapper = styled.TextInput`
  height: ${scale(28)};
  width: 85%;
  align-self: center;
  border-radius: 30;
  border-width: 1;
  padding-horizontal: ${scale(12)};
  margin-top: ${scale(15)};
`;
