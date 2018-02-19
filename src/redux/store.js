import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducers';

export default function configureStore(history) {
  const middleware = [thunk, routerMiddleware(history)];

  return createStore(rootReducer, applyMiddleware(...middleware));
}
