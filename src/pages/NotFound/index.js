import React from 'react';

import s from './styles.css';

const NotFound = () => {
  return (
    <div className={s.notFound}>
      <h1><i className="far fa-meh" /></h1>
      <h3>Page not found</h3>
      <p>Don't worry, we're working on this.</p>
    </div>
  );
}

export default NotFound;
