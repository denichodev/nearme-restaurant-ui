import restaurantReducer from '../reducer';
import * as t from '../constants';

describe('Favorite Reducer', () => {
  test('should return the initial state', () => {
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

    expect(restaurantReducer(undefined, {})).toEqual(initialState);
  });

  test('handles PENDING state', () => {
    const loadingState = {
      loading: true,
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

    expect(
      restaurantReducer(undefined, {
        type: t.RESTAURANT_PENDING,
      }),
    ).toEqual(loadingState);
  });

  test('handles FULFILLED state', () => {
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
      slides: [
        'http://localhost:8080/assets/momoiro-1.jpg',
        'http://localhost:8080/assets/momoiro-2.jpg',
        'http://localhost:8080/assets/momoiro-3.jpg',
      ],
      slug: 'momoiro-kota-kasablanka',
    };

    const fulfilledState = {
      loading: false,
      data: payload,
      errors: [],
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESTAURANT_FULFILLED,
        payload,
      }),
    ).toEqual(fulfilledState);
  });

  test('handles REJECTED state', () => {
    const errors = ['Something went wrong'];
    const rejectedState = {
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
      errors: errors,
    };

    expect(
      restaurantReducer(undefined, {
        type: t.RESTAURANT_REJECTED,
        errors,
      }),
    ).toEqual(rejectedState);
  });
});
