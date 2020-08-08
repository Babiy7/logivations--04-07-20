import React, { useEffect, memo } from 'react';
import './BasicPost.css';

import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import getPostAsync from '../../store/actions/posts';

import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';
import Collapse from '../../components/Collapse/Collapse';

function BasicPost(props) {
    useEffect(() => {
        if(props.posts.length === 0 && props.error === null) {
            props.getPosts();
        }
    }, [props]);
    const { loading, posts, error, comments } = props;
    const { id } = useParams();
    const history = useHistory();
    let content = null;

    console.log(comments);

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
                <Collapse comments={comments} id={post.id} />
            </div>
        )
    }

    return content;
}

const mapStateToProps = state => {
    return {
        loading: state.loading,
        posts: state.posts,
        comments: state.comments,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPostAsync())
    }
}

export default memo(connect(mapStateToProps, mapDispatchToProps)(BasicPost));
