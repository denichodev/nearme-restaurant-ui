import React from 'react';
import { number, node } from 'prop-types';

const classMap = {
  xs: 'col-xs',
  sm: 'col-sm',
  md: 'col-md',
  lg: 'col-lg',
  xsOffset: 'col-xs-offset',
  smOffset: 'col-sm-offset',
  mdOffset: 'col-md-offset',
  lgOffset: 'col-lg-offset',
};

const getClassNames = props => {
  const extraClassNames = [];

  if (props.className) {
    extraClassNames.push(props.className);
  }

  return Object.keys(props)
    .filter(key => classMap[key])
    .map(key => `${classMap[key]}-${props[key]}`)
    .concat(extraClassNames)
    .join(' ');
};

const Col = props => {
  const cssClass = getClassNames(props);
  return <div className={cssClass}>{props.children}</div>;
};

Col.propTypes = {
  xs: number,
  sm: number,
  md: number,
  lg: number,
  xsOffset: number,
  smOffset: number,
  mdOffset: number,
  lgOffset: number,
  children: node.isRequired,
};

export default Col;
