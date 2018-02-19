import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Main from '../Main';

describe('<Main />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Main cuisine="" rating={4.5} name="Momoiro" additionalInfo={[]} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
