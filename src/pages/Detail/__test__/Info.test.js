import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Info from '../Info';

describe('<Info />', () => {
  it('renders correctly', () => {
    const props = {
      address:
        'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
      cuisine: 'Asian',
      openingHours: '10.00 - 22.00',
      phoneNumber: '08980780780',
    }
    const wrapper = shallow(<Info {...props} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
