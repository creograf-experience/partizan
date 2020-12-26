import { LOGIN_USER, SET_PROFILE } from '../actions';

const initialState = {
  user: null
};

export const auth = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN_USER:
      return {
        ...state,
        user: payload
      };

    case SET_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          profile: payload
        }
      };

    default:
      return state;
  }
};