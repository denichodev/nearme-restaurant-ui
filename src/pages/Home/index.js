import React from 'react';
import { func, shape, arrayOf, bool, object } from 'prop-types';
import { connect } from 'react-redux';

import { Grid, Row, Col } from '../../components/Layout';

import Hero from './Hero';

import { getFavoriteFood } from '../../redux/favorite/actions';
import s from './styles.css';

export class Home extends React.Component {
  componentDidMount() {
    this.props.getFavoriteFood();
  }

  render() {
    const { favorite } = this.props;

    return (
      <div className={s.hero}>
        <Grid>
          <Hero favorite={favorite} />
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  favorite: shape({
    loading: bool.isRequired,
    data: arrayOf(object).isRequired,
  }),
  getFavoriteFood: func.isRequired,
};

const mapStateToProps = ({ favorite }) => {
  return {
    favorite,
  };
};

const mapDispatchToProps = {
  getFavoriteFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
