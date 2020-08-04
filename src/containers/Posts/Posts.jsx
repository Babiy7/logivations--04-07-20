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

    let content = null;

    if(props.loading) {
        content = <Spinner />
    } else if (props.error) {
        content = <Alert type='danger' message={props.error} />;
    } else {
        content =  <> 
        {props.posts ? props.posts.slice(0, 20).map(post => {
            return <Post key={post.id} title={post.title} body={post.body} />}
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
    console.log(state);
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
