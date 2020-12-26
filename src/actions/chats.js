import api from '../networkers';

export const GET_ALL_CHATS = 'GET_ALL_CHATS';
export const RECEIVER_CHAT = 'RECEIVER_CHAT';
export const SENDER_CHAT = 'SENDER_CHAT';
export const RECEIVE_BLOCKED_CHAT = 'RECEIVE_BLOCKED_CHAT';
export const RECEIVE_MIRROR_BLOCKED_CHAT = 'RECEIVE_MIRROR_BLOCKED_CHAT';
export const CLEAR_NOTIFICATION = 'CLEAR_NOTIFICATION';
export const SET_ACTIVE_CHAT = 'SET_ACTIVE_CHAT';
export const CLEAR_ACTIVE_CHAT = 'CLEAR_ACTIVE_CHAT';

export const fetchChats = () => async (dispatch) => {
  try {
    const res = await api.chats.getUserChats();

    dispatch({
      type: GET_ALL_CHATS,
      payload: res,
    });
  } catch (err) {
    console.error(err);
  }
};

export const sendChatToServer = data => (dispatch, getState) => {
  const { socket } = getState().socket;
  if (!socket) return;

  socket.emit('create chat', data);
};

export const toggleChatBlock = data => (dispatch, getState) => {
  const { socket } = getState().socket;
  if (!socket) return;

  socket.emit('toggle-block', data);
};

export const clearNotification = chatId => (dispatch, getState) => {
  const { socket } = getState().socket;

  dispatch({ type: CLEAR_NOTIFICATION, payload: chatId });

  if (!socket) return;
  socket.emit('clear notification', chatId);
};

export const setActiveChat = chat => dispatch => (
  dispatch({
    type: SET_ACTIVE_CHAT,
    payload: chat,
  })
);

export const clearActiveChat = () => dispatch => (
  dispatch({
    type: CLEAR_ACTIVE_CHAT,
  })
);

// selectors
export const activeChatWithDefaulValue = state =>
  state.chats.activeChat || { withWho: {}, isBlocked: false, isMirrorBlocked: false };

export const onlyBlockedChats = state =>
  state.chats.chatList.filter(chat => chat.isBlocked);
