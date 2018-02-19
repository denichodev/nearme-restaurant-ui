import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import favorite from './favorite/reducer';
import restaurant from './restaurant/reducer';
import reservation from './reservation/reducer';

export default combineReducers({
  favorite,
  restaurant,
  reservation,
  router: routerReducer
});
