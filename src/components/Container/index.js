import React from 'react';
import { object } from 'prop-types';
import { Switch, Route, Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { Grid, Row } from '../Layout';
import Footer from '../Footer';

import Home from '../../pages/Home';
import Detail from '../../pages/Detail';
import NotFound from '../../pages/NotFound';

import s from './styles.css';

export class Container extends React.Component {
  get isDetailPage() {
    const { location } = this.props;
    return !location.pathname.includes('/r/');
  }

  render() {
    return (
      <div id="container">
        <div className={s.headerNav}>
          <Grid>
            <Row className={s.headerWrapper}>
              <div className={s.logo}>
                <Link to="/">
                  <i className="fas fa-utensils" />
                </Link>
              </div>
              <nav className={s.desktopNav}>
                <ul>
                  <li>
                    <Link to="/explore">Explore</Link>
                  </li>
                  <li>
                    <Link to="/me">Login</Link>
                  </li>
                </ul>
              </nav>
            </Row>
          </Grid>
        </div>
        {this.props.children}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/r/:slug" component={Detail} />
          <Route component={NotFound} />
        </Switch>
        {this.isDetailPage && <Footer />}
      </div>
    );
  }
}

Container.propTypes = {
  location: object.isRequired,
};

const mapStateToProps = ({ router }) => ({
  location: router.location,
});

export default withRouter(connect(mapStateToProps)(Container));
