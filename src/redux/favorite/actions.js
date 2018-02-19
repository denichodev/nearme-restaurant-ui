import api from '../../utils/api';
import * as t from './constants';

export function favoriteFoodPending() {
  return {
    type: t.FAVORITE_FOOD_PENDING
  }
}

export function favoriteFoodFulfilled(payload) {
  return {
    type: t.FAVORITE_FOOD_FULFILLED,
    payload
  }
}

export function favoriteFoodRejected(errors) {
  return {
    type: t.FAVORITE_FOOD_REJECTED,
    errors
  }
}

export function getFavoriteFood() {
  return dispatch => {
    dispatch(favoriteFoodPending());

    return api('/api/v1/top-restaurant')
      .then(res => {
        dispatch(favoriteFoodFulfilled(res))
      })
      .catch(err => dispatch(favoriteFoodRejected(err.toString)));
  }
}