import React from 'react';
import { node, bool, string } from 'prop-types';
import cn from 'classnames';

const Grid = props => {
  return (
    <div
      className={cn(
        'wrap',
        props.fluid ? 'container-fluid' : 'container',
        props.className && props.className,
      )}
    >
      {props.children}
    </div>
  );
};

Grid.defaultProps = {
  fluid: false,
  className: '',
};

Grid.propTypes = {
  fluid: bool,
  className: string,
  children: node.isRequired,
};

export default Grid;
