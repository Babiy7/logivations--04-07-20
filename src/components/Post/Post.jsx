/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import './Post.css';
import { useHistory } from 'react-router-dom';

function Post(props) {
  const {
    id, title, body, comments, views, date,
  } = props.post;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/post/${id}`);
  };

  return (
    <div
      className="post card m-2"
      style={{ width: '18rem' }}
      onClick={handleClick}
    >
      <div className="card-body">
        <h5 className="post__title card-title">{title}</h5>
        <p className="post__content card-text">{body}</p>
      </div>
      <p className="post__footer">
        <div>
          <div>
            comments:
            {' '}
            {comments.length}
          </div>
          <div>
            views:
            {' '}
            {views}
          </div>
        </div>
        <div className="post__date">
          {date}
        </div>
      </p>
    </div>
  );
}

export default Post;
