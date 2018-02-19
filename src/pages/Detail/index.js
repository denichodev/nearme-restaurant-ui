import React from 'react';
import moment from 'moment';
import result from 'lodash/result';
import { object, arrayOf, string, bool, func, node } from 'prop-types';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { connect } from 'react-redux';
import { goBack } from 'react-router-redux';
import DateTime from 'react-datetime';
import cn from 'classnames';

import { Grid, Row, Col } from '../../components/Layout';

import Main from './Main';
import Info from './Info';

import { getRestaurant } from '../../redux/restaurant/actions';
import {
  submitReservation,
  reservationHideToaster,
} from '../../redux/reservation/actions';
import './datetime.css';
import s from './styles.css';

export const Carousel = props => {
  const setting = {
    lazyLoad: true,
    infinite: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        centerPadding: '0px',
        settings: { slidesToShow: 1 },
      },
      {
        breakpoint: 1920,
        centerPadding: '0px',
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <Slider {...setting} className={props.className}>
      {props.children}
    </Slider>
  );
};

Carousel.propTypes = {
  className: string,
  children: node,
};

export class Detail extends React.Component {
  state = {
    overlay: false,
    disableSubmit: true,
    form: {
      checkIn: null,
      guest: 0,
    },
  };

  componentDidMount() {
    const { match, getRestaurant } = this.props;
    getRestaurant(match.params.slug);
  }

  componentDidUpdate() {
    if (this.props.reservationToaster.show) {
      setTimeout(() => {
        this.props.reservationHideToaster();
      }, 3000);
    }
  }

  get todayDate() {
    const yesterday = moment().subtract(1, 'day');
    return current => current.isAfter(yesterday);
  }

  handleChangeDate = val => {
    this.setState(
      {
        form: {
          ...this.state.form,
          checkIn: val.format('YYYY-MM-DD HH:mm:ss'),
        },
      },
      () => {
        this.validateForm();
      },
    );
  };

  handleChangeGuest = evt => {
    this.setState(
      { form: { ...this.state.form, guest: +evt.target.value } },
      () => {
        this.validateForm();
      },
    );
  };

  validateForm = () => {
    if (this.state.form.guest > 0 && this.state.form.checkIn !== '') {
      this.setState({ disableSubmit: false });
    }
  };

  handleSubmit = event => {
    event.preventDefault();
    const data = {
      ...this.state.form,
      userId: this.props.userId || 1, // fake userId
      restaurantId: this.props.restaurant.id,
    };

    this.setState({ overlay: false, form: { checkIn: '', guest: 0 } }, () => {
      this.props.submitReservation(data);
    });
  };

  handleOverlay = () => {
    this.setState(prevState => ({ overlay: !prevState.overlay }));
  };

  renderSlide = () => {
    const slides = this.props.restaurant.data.slides || [];

    return slides.map((s, i) => {
      return (
        <div key={i} className={s.images}>
          <img src={s} alt="test" />
        </div>
      );
    });
  };

  render() {
    const { restaurant, reservation, reservationToaster } = this.props;

    if (restaurant.loading) {
      return <div className={s.loading}>Loading...</div>;
    }

    if (restaurant.errors.length) {
      return <div className={s.errors}>Errors</div>;
    }

    return (
      <div>
        <Helmet>
          <body className="detail-page" />
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
        </Helmet>
        {reservationToaster.show && (
          <div className={s.toaster}>
            <i className="fas fa-check" />
            {reservationToaster.message}
          </div>
        )}
        <div className={s.mobileHeader}>
          <div className={s.backButton}>
            <button onClick={this.props.goBack}>
              <i className="fas fa-angle-left" />
            </button>
          </div>
        </div>
        <Carousel className={s.slickSlider}>{this.renderSlide()}</Carousel>
        <Grid className={s.detailPage}>
          <Row>
            <Col xs={12} sm={12} md={8}>
              <div className={s.wrapper}>
                <Main
                  name={restaurant.data.name}
                  rating={restaurant.data.rating}
                  cuisine={restaurant.data.cuisine}
                  additionalInfo={restaurant.data.additionalInfo}
                />
                <Info
                  cuisine={restaurant.data.cuisine}
                  phoneNumber={restaurant.data.phoneNumber}
                  openingHours={restaurant.data.openingHours}
                  address={restaurant.data.address}
                />
              </div>
            </Col>
            <Col xs={12} sm={12} md={4}>
              <aside>
                <div className={cn(s.sidebar, this.state.overlay && s.overlay)}>
                  <button className={s.close} onClick={this.handleOverlay}>
                    <i className="fas fa-times" />
                  </button>
                  <div className={s.form}>
                    <DateTime
                      isValidDate={this.todayDate}
                      input={false}
                      inputProps={{ placeholder: 'Select date and time...' }}
                      value={this.state.form.checkIn}
                      onChange={this.handleChangeDate}
                    />
                  </div>
                  <div className={s.form}>
                    <input
                      className="guest"
                      type="number"
                      placeholder="Total guest..."
                      value={this.state.form.guest}
                      onChange={this.handleChangeGuest}
                    />
                    <div className={s.person}> person</div>
                  </div>
                  <div className={s.form}>
                    <button
                      className={s.reserve}
                      onClick={this.handleSubmit}
                      disabled={this.state.disableSubmit}
                    >
                      {reservation.loading
                        ? 'Loading...'
                        : 'Make a reservation'}
                    </button>
                  </div>
                </div>
              </aside>
              <div className={s.footerBookBtn}>
                <button onClick={this.handleOverlay}>Make a reservation</button>
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

Detail.propTypes = {
  restaurant: object.isRequired,
  goBack: func.isRequired,
  getRestaurant: func.isRequired,
  reservation: object,
  reservationToaster: object,
};

const mapStateToProps = ({ restaurant, reservation }) => {
  return {
    restaurant: restaurant,
    reservation: reservation,
    reservationToaster: reservation.toaster,
  };
};

const mapDispatchToProps = {
  goBack,
  getRestaurant,
  submitReservation,
  reservationHideToaster,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
