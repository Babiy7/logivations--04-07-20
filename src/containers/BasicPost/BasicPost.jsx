/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './BasicPost.css';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import getPostAsync, { deletePost, editPost } from '../../store/actions/posts';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import Collapse from '../../components/Collapse/Collapse';
import Fab from '../../components/UI/FabButton/FabButton';
import Form from '../../components/UI/Form/Form';

function ChangeContent(props) {
  const { handleEdit, post } = props;

  return (
    <div className="change-content">
      <Form title="Edit post" btnTitle="edit" handleClick={handleEdit} post={post} />
    </div>
  );
}

function Content(props) {
  const {
    post, handleClick, handleDelete, handleOpen, comments,
  } = props;
  return (
    <>
      <div className="basic-post card">
        <div className="basic-post__header card-header">
          <button type="button" className="basic-post__return" onClick={handleClick} />
          <div className="basic-post__title">{post.title ? post.title : null}</div>
          <div>
            <button type="button" className="basic-post__delete" onClick={handleDelete} />
          </div>
        </div>
        <div className="card-body">
          <p className="card-text">{post.body ? post.body : null}</p>
        </div>
        <Collapse comments={comments} id={post.id} />
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
  const [state, setState] = useState({ post: {}, change: false });
  const history = useHistory();
  let content = null;

  useEffect(() => {
    if (posts.length === 0) {
      props.getPost();
    }
    setState((s) => ({ ...s, post }));
  }, [props]);

  function handleClick() {
    history.goBack();
  }

  function handleDelete() {
    history.push('/');
    props.deletePost(id);
  }

  function handleOpen() {
    setState((s) => ({ ...s, change: !s.change }));
  }

  function handleEdit(newPost) {
    setState((s) => ({ post: { ...s.post, ...newPost }, change: !s.change }));
    props.editPost(id, { ...state.post, ...newPost });
  }

  if (loading) {
    content = <Spinner />;
  }

  if (error) {
    content = <Alert type="danger" message={error} />;
  }

  if (posts.length > 0 && state.post) {
    content = state.change
      ? <ChangeContent post={state.post} handleEdit={handleEdit} />
      : (
        <Content
          post={state.post}
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
