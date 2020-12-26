export const LOGIN_USER = 'LOGIN_USER';
export const SET_PROFILE = 'SET_PROFILE';

export const setUser = user => dispatch =>
  dispatch({ type: LOGIN_USER, payload: user });

export const setProfile = profile => dispatch =>
  dispatch({ type: SET_PROFILE, payload: profile });
