import React from 'react';
import { Link } from 'react-router-dom';

import { Grid, Row, Col } from '../Layout';
import s from './styles.css';

const Footer = () => {
  return (
    <footer className={s.container}>
      <Grid className={s.desktop}>
        <Row>
          <Col xs={12}>
            <div className={s.wrapper}>
              <div className={s.copyright}>
                &copy; Aviato.co 2018
              </div>
              <div className={s.menu}>
                <ul>
                  <li><Link to="">About</Link></li>
                  <li><Link to="">Terms</Link></li>
                  <li><Link to="">Privacy Policy</Link></li>
                </ul>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
      <Grid className={s.mobile}>
        <Row>
          <Col xs={12}>
            <div className={s.mobileNav}>
              <div>
                <Link to="/">
                  <i className="fas fa-home" />
                </Link>
              </div>
              <div>
                <Link to="/explore">
                  <i className="fas fa-search" />
                </Link>
              </div>
              <div>
                <Link to="/reserved">
                  <i className="fas fa-heart" />
                </Link>
              </div>
              <div>
                <Link to="/me">
                  <i className="fas fa-user" />
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Grid>
    </footer>
  );
}

export default Footer;
