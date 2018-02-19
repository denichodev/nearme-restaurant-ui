import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Hero from '../Hero';

describe('<Hero />', () => {
  it('renders correctly', () => {
    const props = {
      favorite: {
        loading: false,
        data: [
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
            slides: [
              'http://localhost:8080/assets/momoiro-1.jpg',
              'http://localhost:8080/assets/momoiro-2.jpg',
              'http://localhost:8080/assets/momoiro-3.jpg',
            ],
            slug: 'momoiro-kota-kasablanka',
          },
        ],
      },
    };
    const wrapper = shallow(<Hero {...props} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
