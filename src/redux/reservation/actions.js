import api from '../../utils/api';
import * as t from './constants';

export function reservationPending() {
  return {
    type: t.RESERVATION_PENDING,
  };
}

export function reservationFulfilled(payload) {
  return {
    type: t.RESERVATION_FULFILLED,
    payload,
  };
}

export function reservationRejected(errors) {
  return {
    type: t.RESERVATION_REJECTED,
    errors,
  };
}

export function reservationShowToaster(message) {
  return {
    type: t.RESERVATION_SHOW_TOASTER,
    message,
  };
}

export function reservationHideToaster() {
  return {
    type: t.RESERVATION_HIDE_TOASTER,
  };
}

export function submitReservation(data) {
  return dispatch => {
    dispatch(reservationPending());

    const URL = `/api/v1/reservation`;
    const options = {
      method: 'POST',
      body: data,
    };

    return api(URL, options)
      .then(res => {
        dispatch(reservationShowToaster('Table reserved'))
        dispatch(reservationFulfilled(res))
        return
      })
      .catch(err => dispatch(reservationRejected(err)));
  };
}
