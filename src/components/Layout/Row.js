import React from 'react';
import { bool, string, node } from 'prop-types';
import cn from 'classnames';

const Row = props => {
  const extraClass = props.className && props.className;
  const reverseClass = props.reverse && 'reverse';

  return (
    <div className={cn('row', reverseClass, extraClass)}>{props.children}</div>
  );
};

Row.propTypes = {
  className: string,
  reverse: bool,
  children: node,
};

export default Row;
