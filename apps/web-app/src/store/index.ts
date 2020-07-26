import { createStore, compose, applyMiddleware } from 'redux';
import { createOffline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import rootReducer from './rootReducer';

// Add redux dev tools
let composeEnhancers = compose;
if (process.env.NODE_ENV === 'development') {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
}

const offline = createOffline(offlineConfig);
const store = createStore(
  offline.enhanceReducer(rootReducer),
  composeEnhancers(offline.enhanceStore, applyMiddleware(offline.middleware)),
);

export default store;
