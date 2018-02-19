import React from 'react';
import { string } from 'prop-types';

import s from './styles.css';

class Info extends React.PureComponent {
  render() {
    const { cuisine, phoneNumber, openingHours, address } = this.props;
    return (
      <div className={s.detail}>
        <div className={s.heading}>Detail Info</div>
        <div className={s.detailContent}>
          <div className={s.detailItem}>
            <span>Phone Number</span>
            <span>{phoneNumber}</span>
          </div>
          <div className={s.detailItem}>
            <span>Cuisine</span>
            <span>{cuisine}</span>
          </div>
          <div className={s.detailItem}>
            <span>Opening Hours</span>
            <span>{openingHours}</span>
          </div>
          <div className={s.detailItem}>
            <span>Address</span>
            <span>{address}</span>
          </div>
        </div>
      </div>
    );
  }
}

Info.propTypes = {
  address: string.isRequired,
  cuisine: string.isRequired,
  openingHours: string.isRequired,
  phoneNumber: string.isRequired,
};

export default Info;
