import React from 'react';
import { shallow, mount } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Hero from '../Hero';

describe('<Hero />', () => {
  it('renders correctly', () => {
    const props = {
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
    };
    const wrapper = shallow(<Hero {...props} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('renders loading correctly', () => {
    const props = {
      loading: true,
      data: [],
    };
    const wrapper = shallow(<Hero {...props} />);
    expect(wrapper.find('.loading')).toHaveLength(1);

    wrapper.setProps({
      loading: false,
      data: [],
    });
    expect(wrapper.find('.loading')).toHaveLength(0);
  });

  test('render correct column', () => {
    const data = [];

    for (let i = 0; i < 10; i++) {
      data.push({
        additionalInfo: [],
        address:
          'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
        cover: 'http://localhost:8080/assets/top-momoiro.jpg',
        cuisine: 'Asian',
        id: i,
        location: 'Kota Kasablanka, Tebet, Jakarta',
        name: `Momoiro ${i + 1}`,
        openingHours: '10.00 - 22.00',
        phoneNumber: '08980780780',
        rating: 4.2,
        slides: [],
        slug: `momoiro-kota-kasablanka-${i + 1}`,
      });
    }

    const props = {
      loading: false,
      data: data,
    };
    const wrapper = shallow(<Hero {...props} />);

    expect(
      wrapper
        .find('.topNineWrapper')
        .childAt(2)
        .prop('xs'),
    ).toEqual(12);
    expect(
      wrapper
        .find('.topNineWrapper')
        .childAt(3)
        .prop('xs'),
    ).toEqual(12);
    expect(
      wrapper
        .find('.topNineWrapper')
        .childAt(8)
        .prop('xs'),
    ).toEqual(12);
  });
});
