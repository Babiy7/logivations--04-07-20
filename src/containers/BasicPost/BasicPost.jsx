/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './BasicPost.css';

import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import getPostAsync, { deletePost, editPost } from '../../store/actions/posts';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import Collapse from '../../components/Collapse/Collapse';
import Fab from '../../components/UI/FabButton/FabButton';

function ChangeContent(props) {
  const { state, handleChange, handleEdit } = props;
  return (
    <div className="basic-post card">
      <div className="basic-post__header card-header">
        <TextField
          name="title"
          className="basic-post__input"
          value={state.post.title}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div className="card-body">
        <TextField
          name="body"
          className="basic-post__input"
          multiline
          rows={7}
          value={state.post.body}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div className="basic-post__change-footer">
        <Button
          variant="contained"
          color="primary"
          size="medium"
          fullWidth
          className="basic-post__button"
          onClick={handleEdit}
        >
          Edit
        </Button>
      </div>
    </div>
  );
}

function Content(props) {
  const {
    state, handleClick, handleDelete, handleOpen, comments,
  } = props;
  return (
    <>
      <div className="basic-post card">
        <div className="basic-post__header card-header">
          <button type="button" className="basic-post__return" onClick={handleClick} />
          <div className="basic-post__title">{state.post.title ? state.post.title : null}</div>
          <button type="button" className="basic-post__delete" onClick={handleDelete} />
        </div>
        <div className="card-body">
          <p className="card-text">{state.post.body ? state.post.body : null}</p>
        </div>
        <Collapse comments={comments} id={state.post.id} />
      </div>
      <div className="basic-post__footer">
        <Fab type="edit" handleOpen={handleOpen} />
      </div>
    </>
  );
}

function BasicPost(props) {
  const {
    loading, posts, error,
  } = props;
  const { id } = useParams();
  const post = posts.filter((p) => p.id === +id)[0];
  const [state, setState] = useState({ post: '', change: false });
  const history = useHistory();
  let content = null;

  useEffect(() => {
    if (posts.length === 0) {
      props.getPost();
    }
    setState((s) => ({ ...s, post }));
  }, [props]);

  const handleClick = () => {
    history.goBack();
  };

  const handleDelete = () => {
    history.push('/');
    props.deletePost(id);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setState((s) => ({
      ...s,
      post: {
        ...s.post,
        [name]: value,
      },
    }));
  };

  const handleOpen = () => {
    setState((s) => ({ ...s, change: !s.change }));
  };

  const handleEdit = () => {
    setState((s) => ({ ...s, change: !s.change }));
    props.editPost(id, state.post);
  };

  if (loading) {
    content = <Spinner />;
  }

  if (error) {
    content = <Alert type="danger" message={error} />;
  }

  if (posts.length > 0 && state.post) {
    content = state.change
      ? <ChangeContent state={state} handleChange={handleChange} handleEdit={handleEdit} />
      : (
        <Content
          state={state}
          comments={post.comments}
          handleClick={handleClick}
          handleDelete={handleDelete}
          handleOpen={handleOpen}
        />
      );
  }

  return content;
}

const mapStateToProps = (state) => {
  const {
    loading, posts, error,
  } = state;

  return {
    loading,
    posts,
    error,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getPost: () => dispatch(getPostAsync()),
  deletePost: (id) => dispatch(deletePost(id)),
  editPost: (id, newPost) => dispatch(editPost(id, newPost)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BasicPost);
