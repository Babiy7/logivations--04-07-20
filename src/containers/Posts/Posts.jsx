/* eslint-disable react/prop-types */
import React, { useState, memo } from 'react';
import Post from '../../components/Post/Post';
import './Posts.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import Fab from '../../components/UI/FabButton/FabButton';
import withEffect from '../../hoc/withEffect';
import Modal from '../../components/UI/Modal/Modal';
import AddPost from '../AddPost/AddPost';

function Posts(props) {
  const [open, setOpen] = useState(false);
  const {
    postsState,
  } = props;
  let content = null;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (postsState.loading) {
    content = <Spinner />;
  }

  if (postsState.error) {
    content = <Alert type="danger" message={postsState.error} />;
  } else {
    content = postsState.posts ? postsState.posts.map((post) => <Post post={post} />) : null;
  }

  return (
    <div className="posts">
      {content}
      <div className="posts__footer">
        <Fab type="add" handleOpen={handleOpen} />
      </div>
      <Modal open={open} handleClose={handleClose}>
        <AddPost handleClose={handleClose} />
      </Modal>
    </div>
  );
}

export default memo(withEffect(Posts));
