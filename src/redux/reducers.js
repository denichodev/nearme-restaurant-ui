import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import favorite from './favorite/reducer';
import restaurant from './restaurant/reducer';

export default combineReducers({
  favorite,
  restaurant,
  router: routerReducer
});
