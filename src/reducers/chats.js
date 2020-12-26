import {
  GET_ALL_CHATS,
  RECEIVER_CHAT,
  SENDER_CHAT,
  RECEIVE_MESSAGE,
  RECEIVE_PRIVATE_MESSAGE,
  RECEIVE_BLOCKED_CHAT,
  RECEIVE_MIRROR_BLOCKED_CHAT,
  CLEAR_NOTIFICATION,
  SET_ACTIVE_CHAT,
  CLEAR_ACTIVE_CHAT,
  DELETE_MESSAGE,
} from '../actions';

const initialState = {
  chatList: [],
  activeChat: null,
};

export const chats = (state = initialState, { type, payload }) => {
  switch (type) {
  case GET_ALL_CHATS:
    return {
      ...state,
      chatList: payload,
    };

  case SET_ACTIVE_CHAT:
    return {
      ...state,
      activeChat: payload,
    };

  case CLEAR_ACTIVE_CHAT:
    return {
      ...state,
      activeChat: null,
    };

  case RECEIVER_CHAT:
    return {
      ...state,
      chatList: [payload, ...state.chatList],
    };

  case SENDER_CHAT:
    return {
      ...state,
      chatList: [payload, ...state.chatList],
      activeChat: payload,
    };

  case DELETE_MESSAGE: {
    const updatedList = state.chatList.map(chat => {
      if (
        chat._id === payload.chatId &&
        (chat.latestMessage._id === payload._id || chat.latestMessage.uuid === payload._id)
      ) {
        return { ...chat, latestMessage: payload.latestMessage ? payload.latestMessage : null };
      }

      return chat;
    });

    return {
      ...state,
      chatList: updatedList,
    };
  }

  case RECEIVE_MESSAGE: {
    const chat = findChat(payload.chatId, state.chatList);
    const updatedChat = {
      ...chat,
      latestMessage: payload,
    };

    const updatedList = deleteOriginalChat(updatedChat._id, state.chatList);

    return {
      ...state,
      chatList: [updatedChat, ...updatedList],
    };
  }

  case RECEIVE_PRIVATE_MESSAGE: {
    const chat = findChat(payload.receiverMessage.chatId, state.chatList);
    const updatedChat = {
      ...chat,
      latestMessage: payload.receiverMessage,
      notificationCount: !payload.activeChat || payload.activeChat._id !== chat._id ? chat.notificationCount + 1 : chat.notificationCount,
    };

    const updatedList = deleteOriginalChat(updatedChat._id, state.chatList);

    return {
      ...state,
      chatList: [updatedChat, ...updatedList],
    };
  }

  case RECEIVE_BLOCKED_CHAT: {
    const updatedList = state.chatList.map(chat => {
      if (chat._id === payload) {
        return { ...chat, isBlocked: !chat.isBlocked };
      }

      return chat;
    });

    return {
      ...state,
      chatList: updatedList,
    };
  }

  case RECEIVE_MIRROR_BLOCKED_CHAT: {
    const updatedList = state.chatList.map(chat => {
      if (chat._id === payload) {
        return { ...chat, isMirrorBlocked: !chat.isMirrorBlocked };
      }

      return chat;
    });

    return {
      ...state,
      chatList: updatedList,
    };
  }

  case CLEAR_NOTIFICATION: {
    const updatedList = state.chatList.map(chat => {
      if (chat._id === payload) {
        return { ...chat, notificationCount: 0 };
      }

      return chat;
    });

    return {
      ...state,
      chatList: updatedList,
    };
  }

  default:
    return state;
  }
};

const findChat = (chatId, chatList) => 
  chatList.find(chat => chat._id === chatId);

const deleteOriginalChat = (updatedChatId, chatList) =>
  chatList.filter(chat => chat._id !== updatedChatId);
