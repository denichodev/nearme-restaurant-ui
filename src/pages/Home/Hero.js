import React from 'react';
import { shape, bool, arrayOf, object } from 'prop-types';
import { Link } from 'react-router-dom';
import cn from 'classnames';

import { Row, Col } from '../../components/Layout';
import Rating from '../../components/Rating';
import s from './styles.css';

class Hero extends React.Component {
  renderTopFavorite = () => {
    const { data } = this.props;

    if (data.length === 0) {
      return null
    }

    const restaurant = data[0];

    return (
      <Col xs={12} sm={12} md={5}>
        <div className={s.top}>
          <img src={restaurant.cover} alt={restaurant.name} />
          <Link to={`/r/${restaurant.slug}`}>
            <div className={s.wrapper}>
              <Rating big point={restaurant.rating} />
              <div className={s.cuisine}>{restaurant.cuisine}</div>
              <div className={s.name}>{restaurant.name}</div>
              <div className={s.address}>{restaurant.location}</div>
            </div>
          </Link>
        </div>
      </Col>
    );
  };

  renderLoadingTopNine = () => {
    const loadingChildren = new Array(9);

    return loadingChildren.map((x, index) => {
      const colSize = [2, 3, 8].includes(index) ? 12 : 6;

      return (
        <Col key={x} xs={colSize} sm={colSize} md={4}>
          <div className={s.topNine} />
        </Col>
      );
    });
  };

  renderTopNine = () => {
    const { data } = this.props;

    return data.slice(1, 10).map((restaurant, index) => {
      const colSize = [2, 3, 8].includes(index) ? 12 : 6;

      return (
        <Col xs={colSize} sm={colSize} md={4} key={index}>
          <div className={s.topNine}>
            <img src={restaurant.cover} alt={restaurant.name} />
            <Link to={`/r/${restaurant.slug}`}>
              <div className={s.wrapper}>
                <Rating point={restaurant.rating} />
                <div className={s.cuisine}>{restaurant.cuisine}</div>
                <div className={s.name}>{restaurant.name}</div>
                <div className={s.address}>{restaurant.location}</div>
              </div>
            </Link>
          </div>
        </Col>
      );
    });
  };

  render() {
    const { loading } = this.props;

    if (loading) {
      return (
        <Row className={s.loading}>
          <Col xs={12} sm={12}>
            <h1 className={s.popularHeading}>Popular</h1>
          </Col>
          <Col xs={12} sm={12} md={5}>
            <div className={s.top} />
          </Col>
          <Col xs={12} sm={12} md={7}>
            <Row className="topNineWrapperLoading">{this.renderLoadingTopNine()}</Row>
          </Col>
        </Row>
      );
    }

    return (
      <Row>
        <Col xs={12} sm={12}>
          <h1 className={s.popularHeading}>Popular</h1>
        </Col>
        {this.renderTopFavorite()}
        <Col xs={12} sm={12} md={7}>
          <Row className="topNineWrapper">{this.renderTopNine()}</Row>
        </Col>
      </Row>
    );
  }
}

Hero.propTypes = {
  favorite: shape({
    loading: bool.isRequired,
    data: arrayOf(object).isRequired,
  }),
};

export default Hero;
