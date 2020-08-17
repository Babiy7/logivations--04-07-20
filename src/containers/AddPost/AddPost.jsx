/* eslint-disable react/prop-types */
import React from 'react';
import { connect } from 'react-redux';
import Form from '../../components/UI/Form/Form';
import { addPostAsync } from '../../store/actions/posts';

function AddPost(props) {
  const { addPost, handleClose } = props;

  function handleClick(post) {
    if (post.title && post.body) {
      addPost(post);
      handleClose();
    }
  }

  return <Form handleClick={handleClick} title="Add post" btnTitle="add" />;
}

const mapDispatchToProps = (dispatch) => ({
  addPost: (post) => dispatch(addPostAsync(post)),
});

export default connect(null, mapDispatchToProps)(AddPost);
