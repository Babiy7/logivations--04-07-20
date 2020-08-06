import React, { useEffect } from 'react';
import './BasicPost.css';

import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import getPostAsync from '../../store/actions/posts';

import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';

function BasicPost(props) {
    useEffect(() => {
        if(props.posts.length === 0 && props.error === null) {
            props.getPosts();
        }
    });
    const { loading, posts, error } = props;
    const { id } = useParams();
    const history = useHistory();
    let content = null;

    const handleClick = () => {
        history.push('/');
    }

    if(loading) {
        content = <Spinner />;
    }

    if(error) {
        content = <Alert type='danger' message={error} />;
    }

    if(posts.length > 0) {   
        const [ post ] = posts.filter(post => post.id === +id);
        const { title, body } = post;
        content = ( 
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

    return content;
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        posts: state.posts,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPostAsync())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BasicPost);
