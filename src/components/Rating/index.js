import React from 'react';
import { bool, number } from 'prop-types';
import cn from 'classnames';

import s from './styles.css';

const Rating = ({ point, big }) => {
  const style = {};

  if (point > 4) {
    style['backgroundColor'] = '#5BA829';
  } else if (point > 3 && point <= 4) {
    style['backgroundColor'] = '#9ACD32';
  } else if (point > 2 && point <= 3) {
    style['backgroundColor'] = '#CDD614';
  } else if (point > 0.1 && point <= 2) {
    style['backgroundColor'] = '#FFBA00';
  } else {
    style['backgroundColor'] = '#89959B';
  }

  const html =
    point > 0.1 ? (
      <div>
        <span className={s.point}>{point}</span>
        <span className={s.total}>/5</span>
      </div>
    ) : (
      <span className={s.new}>NEW</span>
    );

  return (
    <div className={cn(s.rating, big && s.big)} style={style}>
      {html}
    </div>
  );
};

Rating.propTypes = {
  point: number,
  big: bool,
};

export default Rating;
