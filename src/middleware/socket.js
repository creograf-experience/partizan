import * as config from '../config';
import io from 'socket.io-client';
import { AsyncStorage } from 'react-native';

import asyncStore from '../utils/asyncStore';

import {
  CONNECT_SOCKET,
  DISCONNECT_SOCKET,
  SET_SOCKET,
  SET_SOCKET_CONNECTION,
  LOGIN_USER,
  RECEIVER_CHAT,
  SENDER_CHAT,
  RECEIVE_MESSAGE,
  RECEIVE_PRIVATE_MESSAGE,
  RECEIVE_BLOCKED_CHAT,
  RECEIVE_MIRROR_BLOCKED_CHAT,
  RECEIVE_VOICE_MESSAGE
} from '../actions';

export default store => next => async action => {
  if (action.type === DISCONNECT_SOCKET) {
    const { socket } = store.getState().socket;
    if (!socket) return;

    socket.close();

    store.dispatch({ type: SET_SOCKET, payload: null });
    store.dispatch({ type: SET_SOCKET_CONNECTION, payload: false });
  }

  if (action.type === CONNECT_SOCKET) {
    let { socket } = store.getState().socket;
    if (socket) return;

    const jwtToken = await AsyncStorage.getItem('token');

    socket = io(config.host);

    socket.on('connect', () => {
      store.dispatch({ type: SET_SOCKET_CONNECTION, payload: true });

      if (jwtToken) {
        socket.emit('init user', jwtToken);
      }
    });

    socket.on('disconnect', () => {
      console.log('disconnect client');
      store.dispatch({ type: DISCONNECT_SOCKET });
    });

    socket.on('receive init user', user =>
      store.dispatch({ type: LOGIN_USER, payload: user })
    );

    socket.on('sender chat', senderChat =>
      store.dispatch({ type: SENDER_CHAT, payload: senderChat })
    );

    socket.on('receiver chat', receiverChat =>
      store.dispatch({ type: RECEIVER_CHAT, payload: receiverChat })
    );

    socket.on('receive message', async senderMessage => {
      await asyncStore.saveMessage(senderMessage);
      store.dispatch({ type: RECEIVE_MESSAGE, payload: senderMessage })
    });

    socket.on('receive private message', async receiverMessage => {
      const { activeChat } = store.getState().chats;

      await asyncStore.saveMessage(receiverMessage);

      store.dispatch({
        type: RECEIVE_PRIVATE_MESSAGE,
        payload: {
          receiverMessage,
          activeChat,
        }
      })
    });

    socket.on('receive blocked chat', chatId =>
      store.dispatch({ type: RECEIVE_BLOCKED_CHAT, payload: chatId })
    );

    socket.on('receive mirror blocked chat', chatId =>
      store.dispatch({ type: RECEIVE_MIRROR_BLOCKED_CHAT, payload: chatId })
    );

    socket.on('err', msg => console.error(msg));

    socket.on('receive voice message', data => 
      store.dispatch({ type: RECEIVE_VOICE_MESSAGE, payload: data })
    );

    store.dispatch({ type: SET_SOCKET, payload: socket });
  }

  return next(action);
};