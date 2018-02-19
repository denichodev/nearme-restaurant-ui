import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import Main from '../Main';

describe('<Main />', () => {
  it('renders correctly', () => {
    const props = {
      cuisine: "Asian",
      rating: 4.5,
      name: "Momoiro",
      additionalInfo: [],
    }
    const wrapper = shallow(<Main {...props} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('has correct background color, shows .new if rating is 0', () => {
    const props = {
      cuisine: "Asian",
      rating: 4.5,
      name: "Momoiro",
      additionalInfo: [],
    }
    const wrapper = shallow(
      <Main {...props} />,
    );

    expect(wrapper.find('.fa-check')).toHaveLength(0);

    expect(wrapper.find('.mainRating').prop('style')).toHaveProperty('backgroundColor', '#5BA829');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ rating: 3.6 })
    expect(wrapper.find('.mainRating').prop('style')).toHaveProperty('backgroundColor', '#9ACD32');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ rating: 2.5 })
    expect(wrapper.find('.mainRating').prop('style')).toHaveProperty('backgroundColor', '#CDD614');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ rating: 1.2 })
    expect(wrapper.find('.mainRating').prop('style')).toHaveProperty('backgroundColor', '#FFBA00');
    expect(wrapper.find('.new')).toHaveLength(0);

    wrapper.setProps({ rating: 0 })
    expect(wrapper.find('.new')).toHaveLength(1);
  });
});
