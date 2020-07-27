import { combineReducers } from 'redux';
import LayoutReducer from './Layout';
import { State } from './state';

const rootReducer = combineReducers<State>({
  layout: LayoutReducer,
});

export default rootReducer;
