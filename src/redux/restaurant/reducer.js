import * as t from './constants';

const initialState = {
  loading: false,
  data: {
    additionalInfo: [],
    address: '',
    cover: '',
    cuisine: '',
    id: 0,
    location: '',
    name: '',
    openingHours: '',
    phoneNumber: '',
    rating: 0,
    slides: [],
    slug: '',
  },
  errors: [],
};

export default function restaurantReducer(state = initialState, action) {
  switch (action.type) {
    case t.RESTAURANT_PENDING:
      return {
        ...state,
        loading: true,
      };
    case t.RESTAURANT_FULFILLED:
      return {
        loading: false,
        data: {
          ...state.data,
          ...action.payload
        },
        errors: [],
      };
    case t.RESTAURANT_REJECTED:
      return {
        ...state,
        loading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
}
