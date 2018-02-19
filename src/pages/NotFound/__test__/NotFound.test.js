import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import NotFound from '../index';

describe('<NotFound />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<NotFound />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
