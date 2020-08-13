/* eslint-disable react/prop-types */
import React, { useState } from 'react';

import { connect } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { addPost } from '../../store/actions/posts';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '37.5ch',
    },
  },
  container: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}));

function AddPost(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    title: '',
    body: '',
  });

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleClick() {
    if (state.title && state.body) {
      props.addPost(state);
      props.handleClose();
    }
  }

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-required"
          label="Title"
          name="title"
          variant="outlined"
          onChange={handleChange}
        />

        <TextField
          id="outlined-multiline-static"
          label="Text"
          name="body"
          multiline
          rows={7}
          variant="outlined"
          onChange={handleChange}
        />
        <div className={classes.container}>
          <Button variant="contained" color="primary" onClick={handleClick}>
            Add
          </Button>
        </div>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPost(post)),
});

export default connect(null, mapDispatchToProps)(AddPost);
