import React from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';

import { RootScreen } from './src/screens';
import combinedReducers from './src/store';

import socketMiddleware from './src/middleware/socket';

export const store = createStore(
  combinedReducers,
  {},
  applyMiddleware(ReduxThunk, socketMiddleware)
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={ store }>
        <RootScreen />
      </Provider>
    );
  }
}
