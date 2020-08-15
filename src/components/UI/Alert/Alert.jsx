/* eslint-disable react/prop-types */
import React from 'react';

function Alert(props) {
  const { type, message } = props;
  const classes = `alert alert-${type}`;

  return (
    <div className={classes} role="alert">
      {message}
    </div>
  );
}

export default Alert;
