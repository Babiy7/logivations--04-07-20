/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react';
import './AddPost.css';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { addPostAsync } from '../../store/actions/posts';

function AddPost(props) {
  const { addPost, handleClose } = props;
  const [state, setState] = useState({
    title: '',
    body: '',
  });
  const inputEl = useRef({ value: 'Owen' });

  useEffect(() => {
    inputEl.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setState({
      ...state,
      [name]: value,
    });
  }

  function handleClick() {
    if (state.title && state.body) {
      addPost(state);
      handleClose();
    }
  }

  return (
    <form className="add-post__form" noValidate autoComplete="off">
      <p className="add-post__title">Add post</p>
      <div>
        <TextField
          className="add-post__input"
          inputRef={inputEl}
          id="outlined-required"
          label="Title"
          name="title"
          fullWidth
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          className="add-post__input"
          id="outlined-multiline-static"
          label="Text"
          name="body"
          fullWidth
          multiline
          rows={7}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div className="add-post__footer">
        <Button variant="contained" color="primary" fullWidth onClick={handleClick}>
          Add
        </Button>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPostAsync(post)),
});

export default connect(null, mapDispatchToProps)(AddPost);
