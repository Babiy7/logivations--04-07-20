import React from 'react';

function Alert(props) {
    const classes = `alert alert-${props.type}`;

    return (
        <div className={classes} role="alert">
            {props.message}
        </div>
    )
}

export default Alert;
