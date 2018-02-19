import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Col from '../Col';

describe('<Col />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <Col>
        <div>Children</div>
      </Col>,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('has xs-* classnames according the prop', () => {
    const props = {
      xs: 3,
      xsOffset: 3,
    };

    const wrapper = shallow(
      <Col {...props}>
        <div>Children</div>
      </Col>,
    );

    expect(wrapper.find('.col-xs-3')).toHaveLength(1);
    expect(wrapper.find('.col-xs-offset-3')).toHaveLength(1);
  });

  test('has sm-* classnames according the prop', () => {
    const props = {
      sm: 3,
      smOffset: 3,
    };

    const wrapper = shallow(
      <Col {...props}>
        <div>Children</div>
      </Col>,
    );

    expect(wrapper.find('.col-sm-3')).toHaveLength(1);
    expect(wrapper.find('.col-sm-offset-3')).toHaveLength(1);
  });

  test('has md-* classnames according the prop', () => {
    const props = {
      md: 3,
      mdOffset: 3,
    };

    const wrapper = shallow(
      <Col {...props}>
        <div>Children</div>
      </Col>,
    );

    expect(wrapper.find('.col-md-3')).toHaveLength(1);
    expect(wrapper.find('.col-md-offset-3')).toHaveLength(1);
  });

  test('has lg-* classnames according the prop', () => {
    const props = {
      lg: 3,
      lgOffset: 3,
    };

    const wrapper = shallow(
      <Col {...props}>
        <div>Children</div>
      </Col>,
    );

    expect(wrapper.find('.col-lg-3')).toHaveLength(1);
    expect(wrapper.find('.col-lg-offset-3')).toHaveLength(1);
  });

  test('append new classname', () => {
    const props = {
      className: 'hello-world',
    };

    const wrapper = shallow(
      <Col {...props}>
        <div>Children</div>
      </Col>,
    );

    expect(wrapper.find('.hello-world')).toHaveLength(1);
  });
});
