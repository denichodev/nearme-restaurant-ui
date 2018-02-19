import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { Container } from '../index';

describe('<Container />', () => {
  it('renders correctly', () => {
    const props = {
      location: {
        pathname: '/',
      },
    };

    const wrapper = shallow(<Container {...props} />)

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('hides footer if the page is detail page', () => {
    const props = {
      location: {
        pathname: '/r/something',
      },
    };

    const wrapper = shallow(<Container {...props} />)

    expect(wrapper.find('Footer')).toHaveLength(0);
  })
});
