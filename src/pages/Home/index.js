import React from 'react';
import { func, arrayOf, bool, object } from 'prop-types';
import { connect } from 'react-redux';

import { Grid } from '../../components/Layout';

import Hero from './Hero';

import { getFavoriteFood } from '../../redux/favorite/actions';
import s from './styles.css';

export class Home extends React.Component {
  componentDidMount() {
    this.props.getFavoriteFood();
  }

  render() {
    const { data, loading } = this.props;

    return (
      <div className={s.hero}>
        <Grid>
          <Hero data={data} loading={loading} />
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  loading: bool.isRequired,
  data: arrayOf(object),
  getFavoriteFood: func.isRequired,
};

const mapStateToProps = ({ favorite }) => {
  return {
    data: favorite.data,
    loading: favorite.loading,
    errors: favorite.errors,
  };
};

const mapDispatchToProps = {
  getFavoriteFood,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
