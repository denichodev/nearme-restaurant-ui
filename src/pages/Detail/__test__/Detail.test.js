import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';

import { Detail, Carousel } from '../index';

describe('<Detail />', () => {
  test('renders correctly', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address:
            'Gandaria City, Lantai Upper Ground, Jl. Sultan Iskandar Muda, Gandaria, Jakarta',
          cover: 'http://localhost:8080/assets/top-momoiro.jpg',
          cuisine: 'Asian',
          id: 1,
          location: 'Kota Kasablanka, Tebet, Jakarta',
          name: 'Momoiro',
          openingHours: '10.00 - 22.00',
          phoneNumber: '08980780780',
          rating: 4.2,
          slides: [
            'http://localhost:8080/assets/momoiro-1.jpg',
            'http://localhost:8080/assets/momoiro-2.jpg',
            'http://localhost:8080/assets/momoiro-3.jpg',
          ],
          slug: 'momoiro-kota-kasablanka',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('renders Carousel correctly', () => {
    const props = {
      className: 'gf-slide',
    };
    const wrapper = shallow(
      <Carousel {...props}>
        <div>
          <img src="random.jpg" />
        </div>
      </Carousel>,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  test('renders loading correctly', () => {
    const props = {
      restaurant: {
        loading: true,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    expect(wrapper.find('.loading')).toHaveLength(1);
  });

  test('renders errors correctly', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: ['Something went wrong'],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    expect(wrapper.find('.errors')).toHaveLength(1);
  });

  test('renders overlay correctly', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    wrapper.find('.footerBookBtn button').simulate('click');
    expect(wrapper.find('.overlay')).toHaveLength(1);

    wrapper.find('.close').simulate('click');
    expect(wrapper.find('.overlay')).toHaveLength(0);
  });

  test('change state', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    wrapper.find('.footerBookBtn button').simulate('click');
    expect(wrapper.find('.overlay')).toHaveLength(1);

    wrapper.find('.close').simulate('click');
    expect(wrapper.find('.overlay')).toHaveLength(0);
  });

  test('renders button correctly', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: true,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    expect(wrapper.find('.reserve').text()).toEqual('Loading...');

    wrapper.setProps({ reservation: { loading: false } });
    expect(wrapper.find('.reserve').text()).toEqual('Make a reservation');
  });

  test('renders toaster correctly', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: true,
        message: 'Table reserved',
      },
    };
    const wrapper = shallow(<Detail {...props} />);

    expect(wrapper.find('.toaster')).toHaveLength(1);

    wrapper.setProps({ reservationToaster: { show: false, message: '' } });
    expect(wrapper.find('.toaster')).toHaveLength(0);
  });

  test('handle input change correctly', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);
    wrapper
      .find('.form input[type="number"]')
      .simulate('change', { target: { value: 2 } });
    expect(wrapper.state().form.guest).toEqual(2);
  });

  test('button should disabled if form is empty', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
    };
    const wrapper = shallow(<Detail {...props} />);
    wrapper.setState({ form: { checkIn: '', guest: 0 } });
    expect(wrapper.find('.form button').prop('disabled')).toEqual(true);
  });

  test('submit button should reset form', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
      submitReservation: jest.fn(),
    };
    const wrapper = shallow(<Detail {...props} />);

    wrapper.setState({ form: { checkIn: '2018:02:20 00:00:00', guest: 2 } });
    expect(wrapper.state().form).toEqual({
      checkIn: '2018:02:20 00:00:00',
      guest: 2,
    });

    wrapper.find('.form button').simulate('click', { preventDefault() {} });
    expect(wrapper.state().form).toEqual({
      checkIn: '',
      guest: 0,
    });

    expect(props.submitReservation).toBeCalled();
  });

  test('input should call handleChange', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
      submitReservation: jest.fn(),
    };
    const wrapper = shallow(<Detail {...props} />);
    const validateForm = jest.spyOn(wrapper.instance(), 'validateForm');
    const event = { target: { value: 2 } };

    wrapper.find('.form .guest').simulate('change', event);

    expect(validateForm).toHaveBeenCalled();
    expect(wrapper.state().form).toEqual({ checkIn: null, guest: 2 });
  });

  test('hideToaster called after 3s', () => {
    const props = {
      restaurant: {
        loading: false,
        data: {
          additionalInfo: [],
          address: '',
          cover: '',
          cuisine: '',
          id: 1,
          location: '',
          name: '',
          openingHours: '',
          phoneNumber: '',
          rating: 0,
          slides: [],
          slug: '',
        },
        errors: [],
      },
      match: { params: { slug: '/' } },
      goBack: jest.fn(),
      getRestaurant: jest.fn(),
      reservation: {
        loading: false,
      },
      reservationToaster: {
        show: false,
        message: '',
      },
      submitReservation: jest.fn(),
    };
    const wrapper = shallow(<Detail {...props} />);

    wrapper.setProps({
      reservationToaster: { show: true, message: 'Table reserved' },
    });

    expect(wrapper.find('.toaster')).toHaveLength(1);
  });
});
