// test-utils.js
import React from 'react';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from '../../store/rootReducer';
import { State } from '../../store/state';

interface ReduxRenderOptions {
  initialState?: State;
  store?: Store<State>;
}

export default function reduxWrapper(
  children?: React.ReactNode,
  {
    initialState,
    store = createStore(rootReducer, initialState),
  }: ReduxRenderOptions | undefined = {},
) {
  return <Provider store={store}>{children}</Provider>;
}
