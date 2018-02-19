import { createStore } from 'redux';
import favoriteReducer from '../favorite/reducer';
import restaurantReducer from '../restaurant/reducer';
import rootReducer from '../reducers';

describe('Root Reducer', () => {
  test('return correct object', () => {
    const store = createStore(rootReducer);

    expect(store.getState().favorite).toEqual(favoriteReducer(undefined, {}));
    expect(store.getState().restaurant).toEqual(restaurantReducer(undefined, {}));
  })
})