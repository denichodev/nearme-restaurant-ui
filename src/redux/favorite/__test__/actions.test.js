import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import * as a from '../actions';
import * as t from '../constants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe(`Favorite action's creator`, () => {
  afterEach(() => {
    fetchMock.reset();
    fetchMock.restore();
  });

  test('should return correct object', () => {
    expect(a.favoriteFoodPending()).toEqual({
      type: t.FAVORITE_FOOD_PENDING,
    });

    const payload = [
      {
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
    ];

    expect(a.favoriteFoodFulfilled(payload)).toEqual({
      type: t.FAVORITE_FOOD_FULFILLED,
      payload: [
        {
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
      ],
    });

    const errors = ['Internal server error'];

    expect(a.favoriteFoodRejected(errors)).toEqual({
      type: t.FAVORITE_FOOD_REJECTED,
      errors: ['Internal server error'],
    });
  });

  test('fetches favorite restaurants', () => {
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

    fetchMock.getOnce('http://localhost:8080/api/v1/top-restaurant', result);

    const expectedActions = [
      { type: t.FAVORITE_FOOD_PENDING },
      {
        type: t.FAVORITE_FOOD_FULFILLED,
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

    return store.dispatch(a.getFavoriteFood()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
