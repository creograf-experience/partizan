import styled from 'styled-components';
import { scale } from 'react-native-size-matters';


export const HeaderButtonWrapper = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
  padding-right: ${scale(10)};
`;
