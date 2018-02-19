import api from '../../utils/api';
import * as t from './constants';

export function restaurantPending() {
  return {
    type: t.RESTAURANT_PENDING,
  };
}

export function restaurantFulfilled(payload) {
  return {
    type: t.RESTAURANT_FULFILLED,
    payload,
  };
}

export function restaurantRejected(errors) {
  return {
    type: t.RESTAURANT_REJECTED,
    errors,
  };
}

export function getRestaurant(slug) {
  return dispatch => {
    dispatch(restaurantPending());

    const URL = `/api/v1/restaurants/${slug}`;

    return api(URL)
      .then(res => dispatch(restaurantFulfilled(res)))
      .catch(err => dispatch(restaurantRejected(err)));
  };
}
