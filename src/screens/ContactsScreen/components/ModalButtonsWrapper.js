import styled from 'styled-components';

import {
  colors,
} from '../../../constants';


export const ModalChatButtonWrapper = styled.TouchableOpacity`
  justify-content: center;
  flex: 1;
  align-items: center;
  border-top-width: 1;
  border-top-color: #000000;
`;

export const ModalShareButtonWrapper = styled(ModalChatButtonWrapper)`
  border-left-width: 1;
  border-left-color: #000000;
`;
