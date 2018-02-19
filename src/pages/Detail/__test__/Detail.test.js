import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { Detail } from '../index';

describe('<Detail />', () => {
  it('renders correctly', () => {
    const props = {
      loading: false,
      restaurant: {
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
      },
      errors: [],
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
    };
    const wrapper = shallow(<Detail {...props} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
