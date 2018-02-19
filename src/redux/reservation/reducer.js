import * as t from './constants';

const initialState = {
  loading: false,
  data: [],
  errors: [],
  toaster: {
    show: false,
    message: '',
  }
};

export default function reservationReducer(state = initialState, action) {
  switch (action.type) {
    case t.RESERVATION_PENDING:
      return {
        ...state,
        loading: true,
      };
    case t.RESERVATION_FULFILLED:
      return {
        ...state,
        loading: false,
        data: state.data.concat(action.payload),
        errors: [],
      };
    case t.RESERVATION_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    case t.RESERVATION_SHOW_TOASTER:
      return {
        ...state,
        toaster: {
          show: true,
          message: action.message,
        }
      };
    case t.RESERVATION_HIDE_TOASTER:
      return {
        ...state,
        toaster: {
          show: false,
          message: '',
        }
      };
    default:
      return state;
  }
}
