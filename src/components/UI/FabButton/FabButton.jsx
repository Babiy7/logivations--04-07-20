import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const FabButton = props => {
    return (
        <Fab color="primary" aria-label="add" onClick={props.handleOpen} >
            <AddIcon />
        </Fab>
    )
}

export default FabButton
