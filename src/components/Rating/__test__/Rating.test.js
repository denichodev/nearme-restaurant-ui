import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Rating from '../index';

describe('<Rating />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <Rating point={4.5} />,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('has `.big` css class', () => {
    const wrapper = shallow(
      <Rating point={4.5} big />,
    );

    expect(wrapper.find('.big')).toHaveLength(1);
  });

  test('has correct background color, shows .new if rating is 0', () => {
    const wrapper = shallow(
      <Rating point={4.5} />,
    );

    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', '#5BA829');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ point: 3.6 })
    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', '#9ACD32');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ point: 2.5 })
    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', '#CDD614');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ point: 1.2 })
    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', '#FFBA00');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ point: 0 })
    expect(wrapper.find('.new')).toHaveLength(1);
  });
});