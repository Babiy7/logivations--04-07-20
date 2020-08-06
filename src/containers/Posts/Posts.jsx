import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import getPostAsync from '../../store/actions/posts';
import Post from '../../components/Post/Post';
import './Posts.css';
import Spinner from '../../components/UI/Spinner/Spinner';
import Alert from '../../components/UI/Alert/Alert';

function Posts(props) {
    useEffect(() => {
        if(props.posts.length === 0 && props.error === null) {
            props.getPost(getPostAsync());
        }
    });

    const { loading, posts, error } = props;

    let content = null;

    if(loading) {
        content = <Spinner />
    } 
    
    if (error) {
        content = <Alert type='danger' message={error} />;
    } else {
        content =  <> 
        {posts ? posts.map(post => {
            const { id, title, body } = post;
            return <Post key={id} id={id} title={title} body={body} />}
       ) : null } 
       </>;
    }
   
    return (
        <div className='posts-wrapper'>
          {content}
        </div>
    )
}

const mapStateToProps = state => {  
    const { loading, posts, error } = state;
    
    return {
      loading: loading,
      posts: posts,
      error: error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: action => dispatch(action)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);
