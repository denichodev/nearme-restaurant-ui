import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as a from '../actions';
import * as t from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(`Restaurant action's creator`, () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should submit', () => {
    expect(a.reservationPending()).toEqual({
      type: t.RESERVATION_PENDING,
    });

    const payload = [
      {
        id: 1,
        userId: 2,
        restaurantId: 44,
        checkIn: '2018:02:28 00:00',
        guest: 3,
      },
    ];

    expect(a.reservationFulfilled(payload)).toEqual({
      type: t.RESERVATION_FULFILLED,
      payload: [
        {
          id: 1,
          userId: 2,
          restaurantId: 44,
          checkIn: '2018:02:28 00:00',
          guest: 3,
        },
      ],
    });

    const errors = ['Internal server error'];

    expect(a.reservationRejected(errors)).toEqual({
      type: t.RESERVATION_REJECTED,
      errors: ['Internal server error'],
    });
  });

  test('submit reservation', () => {
    const result = [
      {
        id: 1,
        userId: 2,
        restaurantId: 44,
        checkIn: '2018:02:28 00:00',
        guest: 3,
      },
    ];

    fetchMock.postOnce('http://localhost:8080/api/v1/reservation', result);

    const expectedActions = [
      { type: t.RESERVATION_PENDING },
      {
        type: t.RESERVATION_SHOW_TOASTER,
        message: 'Table reserved',
      },
      {
        type: t.RESERVATION_FULFILLED,
        payload: [
          {
            id: 1,
            userId: 2,
            restaurantId: 44,
            checkIn: '2018:02:28 00:00',
            guest: 3,
          },
        ],
      },
    ];

    const store = mockStore({ reservation: {} });
    const data = {
      userId: 2,
      restaurantId: 44,
      checkIn: '2018:02:28 00:00',
      guest: 3,
    };

    return store.dispatch(a.submitReservation(data)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
