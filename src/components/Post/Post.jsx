import React from 'react';
import './Post.css';
import { useHistory } from 'react-router-dom';

function Post(props) {
    const { id, title, body, comments } = props;
    const history = useHistory();
  
    const amount = comments.filter(comment => props.id === comment.postId);

    return (
        <div 
            className="post card m-2 card-hover" 
            style={{width: '18rem'}} 
            onClick={() => history.push(`/post/${id}`)}
        >
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{body}</p>
            </div>
            <p className='post__comments'> comments: {amount.length}</p>
        </div>
    )
}

export default Post;
