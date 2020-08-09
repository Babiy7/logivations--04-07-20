import React from 'react'
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';

const FabButton = props => {
    return (
        <Fab color="primary" aria-label="add" onClick={props.handleOpen} >
            {props.type === 'add' ? <AddIcon /> : <EditIcon /> }
        </Fab>
    )
}

export default FabButton
