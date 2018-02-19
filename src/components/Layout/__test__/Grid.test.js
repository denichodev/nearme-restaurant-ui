import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Grid from '../Grid';

describe('<Grid />', () => {
  test('renders correctly', () => {
    const wrapper = shallow(
      <Grid>
        <div>Children</div>
      </Grid>,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('has fluid class', () => {
    const wrapper = shallow(
      <Grid fluid>
        <div>Children</div>
      </Grid>,
    );

    expect(wrapper.find('.container-fluid')).toHaveLength(1);
  });

  test('has extra class', () => {
    const wrapper = shallow(
      <Grid fluid className="hello-world">
        <div>Children</div>
      </Grid>,
    );

    expect(wrapper.find('.hello-world')).toHaveLength(1);
  });
});