import favoriteReducer from '../reducer';
import * as t from '../constants';

describe('Favorite Reducer', () => {
  test('should return the initial state', () => {
    const initialState = {
      loading: false,
      data: [],
      errors: [],
    };

    expect(favoriteReducer(undefined, {})).toEqual(initialState);
  });

  test('handles PENDING state', () => {
    const loadingState = {
      loading: true,
      data: [],
      errors: [],
    };

    expect(
      favoriteReducer(undefined, {
        type: t.FAVORITE_FOOD_PENDING,
      }),
    ).toEqual(loadingState);
  });

  test('handles FULFILLED state', () => {
    const payload = [
      {
        a: 1,
        b: 2,
      },
    ]

    const fulfilledState = {
      loading: false,
      data: payload,
      errors: [],
    };

    expect(
      favoriteReducer(undefined, {
        type: t.FAVORITE_FOOD_FULFILLED,
        payload
      }),
    ).toEqual(fulfilledState);
  });

  test('handles REJECTED state', () => {
    const errors = ['Something went wrong'];
    const rejectedState = {
      loading: false,
      data: [],
      errors: errors,
    };

    expect(
      favoriteReducer(undefined, {
        type: t.FAVORITE_FOOD_REJECTED,
        errors
      }),
    ).toEqual(rejectedState);
  });
});
