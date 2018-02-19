import * as t from './constants';

const initialState = {
  loading: false,
  data: [],
  errors: [],
};

export default function foodReducer(state = initialState, action) {
  switch (action.type) {
    case t.FAVORITE_FOOD_PENDING:
      return {
        ...state,
        loading: true,
      };
    case t.FAVORITE_FOOD_FULFILLED:
      return {
        loading: false,
        data: action.payload,
        errors: [],
      };
    case t.FAVORITE_FOOD_REJECTED:
      return {
        loading: false,
        data: [],
        errors: action.errors,
      };
    default:
      return state;
  }
}
