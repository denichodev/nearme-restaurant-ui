import React from 'react';
import moment from 'moment';
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
import './datetime.css';
import s from './styles.css';

const Carousel = props => {
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
  children: node
}

export class Detail extends React.Component {
  state = {
    overlay: false,
    form: {
      datetime: null,
      guest: 0,
    },
  };

  componentDidMount() {
    const { match, getRestaurant } = this.props;
    getRestaurant(match.params.slug);
  }

  get todayDate() {
    const yesterday = moment().subtract(1, 'day');
    return current => current.isAfter(yesterday);
  }

  handleChangeDate = val => {
    this.setState({ form: { datetime: val.format('YYYY-MM-DD HH:mm:ss') } });
  };

  handleChangeGuest = evt => {
    this.setState({ form: { guest: evt.target.value } });
  };

  handleSubmit = event => {
    event.preventDefault();

    console.log(this.state.form);
  };

  handleOverlay = () => {
    this.setState(prevState => ({ overlay: !prevState.overlay }));
  };

  renderSlide = () => {
    const slides = this.props.restaurant.slides || [];

    return slides.map((s, i) => {
      return (
        <div key={i} className={s.images}>
          <img src={s} alt="test" />
        </div>
      );
    });
  };

  render() {
    const { loading, restaurant, errors } = this.props;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (errors.length) {
      return <div>Errors</div>;
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
                  name={restaurant.name}
                  rating={restaurant.rating}
                  cuisine={restaurant.cuisine}
                  additionalInfo={restaurant.additionalInfo}
                />
                <Info
                  cuisine={restaurant.cuisine}
                  phoneNumber={restaurant.phoneNumber}
                  openingHours={restaurant.openingHours}
                  address={restaurant.address}
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
                      onChange={this.handleChangeDate}
                    />
                  </div>
                  <div className={s.form}>
                    <input
                      type="number"
                      placeholder="Total guest..."
                      onChange={this.handleChangeGuest}
                    />
                    <div className={s.person}> person</div>
                  </div>
                  <div className={s.form}>
                    <button className={s.reserve} onClick={this.handleSubmit}>
                      Make a reservation
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
  loading: bool.isRequired,
  errors: arrayOf(string),
  goBack: func.isRequired,
  getRestaurant: func.isRequired,
};

const mapStateToProps = ({ restaurant }) => {
  return {
    restaurant: restaurant.data,
    loading: restaurant.loading,
    errors: restaurant.errors,
  };
};

const mapDispatchToProps = {
  goBack,
  getRestaurant,
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);
