import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import logger from 'redux-logger';

import rootReducer from './reducers';

export default function configureStore(history) {
  const middleware = [thunk, logger, routerMiddleware(history)];

  return createStore(rootReducer, applyMiddleware(...middleware));
}
