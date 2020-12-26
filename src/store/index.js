import { combineReducers } from 'redux';

import {
  socket,
  auth,
  chats,
  messages,
  contacts
} from '../reducers';

export default combineReducers({
  chats,
  messages,
  socket,
  auth,
  contacts
});
