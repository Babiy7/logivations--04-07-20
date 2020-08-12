import React from 'react';
import './Post.css';
import { useHistory } from 'react-router-dom';

function Post(props) {
  const {
    id, title, body, comments, views,
  } = props;
  const history = useHistory();

  const handleClick = () => {
    history.push(`/post/${id}`);
  };

  return (
    <div
      className="post card m-2 card-hover"
      style={{ width: '18rem' }}
      onClick={handleClick}
    >
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{body}</p>
      </div>
      <p className="post__comments">
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
      </p>
    </div>
  );
}

export default Post;
