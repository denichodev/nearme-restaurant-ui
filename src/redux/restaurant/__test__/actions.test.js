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

  test('should return correct object', () => {
    expect(a.restaurantPending()).toEqual({
      type: t.RESTAURANT_PENDING,
    });

    const payload = {
      additionalInfo: [],
      address:
        'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
      cover: 'http://localhost:8080/assets/top-momoiro.jpg',
      cuisine: 'Asian',
      id: 1,
      location: 'Kota Kasablanka, Tebet, Jakarta',
      name: 'Momoiro',
      openingHours: '10.00 - 22.00',
      phoneNumber: '08980780780',
      rating: 4.2,
      slides: [],
      slug: 'momoiro-kota-kasablanka',
    };

    expect(a.restaurantFulfilled(payload)).toEqual({
      type: t.RESTAURANT_FULFILLED,
      payload: {
        additionalInfo: [],
        address:
          'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
        cover: 'http://localhost:8080/assets/top-momoiro.jpg',
        cuisine: 'Asian',
        id: 1,
        location: 'Kota Kasablanka, Tebet, Jakarta',
        name: 'Momoiro',
        openingHours: '10.00 - 22.00',
        phoneNumber: '08980780780',
        rating: 4.2,
        slides: [],
        slug: 'momoiro-kota-kasablanka',
      },
    });

    const errors = ['Internal server error'];

    expect(a.restaurantRejected(errors)).toEqual({
      type: t.RESTAURANT_REJECTED,
      errors: ['Internal server error'],
    });
  });

  test('fetches restaurant', () => {
    const result = {
      additionalInfo: [],
      address:
        'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
      cover: 'http://localhost:8080/assets/top-momoiro.jpg',
      cuisine: 'Asian',
      id: 1,
      location: 'Kota Kasablanka, Tebet, Jakarta',
      name: 'Momoiro',
      openingHours: '10.00 - 22.00',
      phoneNumber: '08980780780',
      rating: 4.2,
      slides: [],
      slug: 'momoiro-kota-kasablanka',
    };

    fetchMock.getOnce(
      'http://localhost:8080/api/v1/restaurants/momoiro-kota-kasablanka',
      result,
    );

    const expectedActions = [
      { type: t.RESTAURANT_PENDING },
      {
        type: t.RESTAURANT_FULFILLED,
        payload: {
          additionalInfo: [],
          address:
            'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
          cover: 'http://localhost:8080/assets/top-momoiro.jpg',
          cuisine: 'Asian',
          id: 1,
          location: 'Kota Kasablanka, Tebet, Jakarta',
          name: 'Momoiro',
          openingHours: '10.00 - 22.00',
          phoneNumber: '08980780780',
          rating: 4.2,
          slides: [],
          slug: 'momoiro-kota-kasablanka',
        },
      },
    ];

    const store = mockStore({ favorite: {} });

    return store
      .dispatch(a.getRestaurant('momoiro-kota-kasablanka'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
