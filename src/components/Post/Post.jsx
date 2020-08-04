import React from 'react';

function Post(props) {
    return (
        <div className="card m-2" style={{width: '18rem'}}>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.body}</p>
            </div>
        </div>
    )
}

export default Post;
