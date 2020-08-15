/* eslint-disable react/prop-types */
import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const FabButton = (props) => {
  const { type, handleOpen } = props;
  return (
    <Fab color="primary" aria-label="add" onClick={handleOpen}>
      {type === 'add' ? <AddIcon /> : <EditIcon /> }
    </Fab>
  );
};

export default FabButton;
