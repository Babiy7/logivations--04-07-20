import React from 'react';

function Post(props) {
    return (
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.body}</p>
            </div>
      </div>
    )
}

export default Post;
