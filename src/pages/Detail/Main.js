import React from 'react';
import { arrayOf, shape, bool, string, number } from 'prop-types';

import s from './styles.css';

class Main extends React.Component {
  renderAdditionalInfo = () => {
    const additionalInfo = this.props.additionalInfo;
    const info = additionalInfo
      .map(a => (a.status ? a.text : null))
      .filter(x => x);

    return info.map((text, index) => {
      return (
        <div key={index}>
          <span>{text}</span>
          <span>
            <i className="fas fa-check" />
          </span>
        </div>
      );
    });
  };

  renderRating = () => {
    const { rating } = this.props;
    const style = {};

    if (rating > 4) {
      style['backgroundColor'] = '#5BA829';
    } else if (rating > 3 && rating <= 4) {
      style['backgroundColor'] = '#9ACD32';
    } else if (rating > 2 && rating <= 3) {
      style['backgroundColor'] = '#CDD614';
    } else if (rating > 0.1 && rating <= 2) {
      style['backgroundColor'] = '#FFBA00';
    } else {
      style['backgroundColor'] = '#89959B';
    }

    if (rating < 0.1) {
      return (
        <div className={s.mainRating} style={style}>
          <span>NEW</span>
        </div>
      );
    }

    return (
      <div className={s.mainRating} style={style}>
        <span>{rating}</span>
        <span className={s.totalRating}>/5</span>
      </div>
    );
  };

  render() {
    const { name, cuisine } = this.props;

    return (
      <div className={s.main}>
        <h1>{name}</h1>
        <p>{cuisine}</p>

        {this.renderRating()}
        <div className={s.additional}>{this.renderAdditionalInfo()}</div>
      </div>
    );
  }
}

Main.propTypes = {
  additionalInfo: arrayOf(
    shape({
      text: string,
      status: bool,
    }),
  ),
  cuisine: string.isRequired,
  name: string.isRequired,
  rating: number.isRequired,
}

export default Main;
