import React from 'react';
import './Post.css';
import { Link } from 'react-router-dom';

function Post(props) {
    
    return (
        <div className="post card m-2 card-hover" style={{width: '18rem'}}>
            <Link to={`/post/${props.id}`} className='post-link'>
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.body}</p>
                </div>
            </Link>
        </div>
    )
}

export default Post;
