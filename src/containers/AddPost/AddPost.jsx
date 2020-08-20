/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/UI/Form/Form';
import { addPostAsync } from '../../store/actions/posts';
import { OPEN_SNACKBAR } from '../../store/actionTypes';

function AddPost(props) {
  const { addPost, handleClose, openSnackbar } = props;

  function handleClick(post) {
    if (post.title && post.body) {
      addPost(post);
      openSnackbar(`Added post ${post.title}`);
      handleClose();
    }
  }

  return <Form handleClick={handleClick} handleClose={handleClose} title="Add post" btnTitle="add" />;
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPostAsync(post)),
  openSnackbar: (message) => dispatch({ type: OPEN_SNACKBAR, payload: message }),
});

export default connect(null, mapDispatchToProps)(AddPost);
