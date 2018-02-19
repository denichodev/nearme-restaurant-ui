import restaurantReducer from '../reducer';
import * as t from '../constants';

describe('Reservation Reducer', () => {
  test('should return the initial state', () => {
    const initialState = {
      loading: false,
      data: [],
      errors: [],
      toaster: {
        show: false,
        message: '',
      },
    };

    expect(restaurantReducer(undefined, {})).toEqual(initialState);
  });

  test('handles PENDING state', () => {
    const loadingState = {
      loading: true,
      data: [],
      errors: [],
      toaster: {
        show: false,
        message: '',
      },
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESERVATION_PENDING,
      }),
    ).toEqual(loadingState);
  });

  test('handles FULFILLED state', () => {
    const payload = [
      {
        id: 1,
        userId: 2,
        restaurantId: 44,
        checkIn: '2018:02:28 00:00',
        guest: 3,
      },
    ];

    const fulfilledState = {
      loading: false,
      data: payload,
      errors: [],
      toaster: {
        show: false,
        message: '',
      },
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESERVATION_FULFILLED,
        payload,
      }),
    ).toEqual(fulfilledState);
  });

  test('handles REJECTED state', () => {
    const errors = ['Something went wrong'];
    const rejectedState = {
      loading: false,
      data: [],
      errors: errors,
      toaster: {
        show: false,
        message: '',
      },
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESERVATION_REJECTED,
        errors,
      }),
    ).toEqual(rejectedState);
  });

  test('handles SHOW TOASTER', () => {
    const message = 'Table reserved';
    const expectedState = {
      loading: false,
      data: [],
      errors: [],
      toaster: {
        show: true,
        message: message,
      },
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESERVATION_SHOW_TOASTER,
        message,
      }),
    ).toEqual(expectedState);
  });

  test('handles HIDE TOASTER state', () => {
    const rejectedState = {
      loading: false,
      data: [],
      errors: [],
      toaster: {
        show: false,
        message: '',
      },
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESERVATION_HIDE_TOASTER,
      }),
    ).toEqual(rejectedState);
  });
});
