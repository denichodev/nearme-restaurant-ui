import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Footer from '../index';

describe('<Footer />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Footer />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
