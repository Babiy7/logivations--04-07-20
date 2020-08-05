import React from 'react';
import './BasicPost.css';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

function BasicPost(props) {
    const { posts } = props;
    const { id } = useParams();
    const history = useHistory();
    const [ post ] = posts.filter(post => post.id === +id);
    const { title, body } = post;

    const handleClick = () => {
        history.push('/');
    }

    return (
        <div className="basic-post card">
            <div className="basic-post__header card-header">
                <button className="basic-post__button" onClick={handleClick} ></button>
                <div className="basic-post__title" >{title ? title : null}</div>
            </div>
            <div className="card-body">
                <p className="card-text">{body ? body : null}</p>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}

export default connect(mapStateToProps)(BasicPost);
