import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Row from '../Row';

describe('<Row />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <Row>
        <div>Children</div>
      </Row>,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('has reverse class', () => {
    const wrapper = shallow(
      <Row reverse>
        <div>Children</div>
      </Row>,
    );

    expect(wrapper.find('.reverse')).toHaveLength(1);
  });

  test('has extra class', () => {
    const wrapper = shallow(
      <Row reverse className="hello-world">
        <div>Children</div>
      </Row>,
    );

    expect(wrapper.find('.hello-world')).toHaveLength(1);
  });
});
