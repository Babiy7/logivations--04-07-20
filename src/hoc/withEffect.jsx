import React from 'react';
import { connect } from 'react-redux';
import getPostAsync, { deletePost } from '../store/actions/posts';

const mapStateToProps = state => {  
    const { loading, posts, error, comments } = state;
   
    return {
      loading: loading,
      posts: posts,
      comments: comments,
      error: error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getPost: action => dispatch(action),
        deletePost: id => dispatch(deletePost(id))
    }
}

function withEffect(WrappedComponent) {

    class WithEffect extends React.Component {
        componentDidMount() {
            this.props.getPost(getPostAsync());
        }

        render() {
            const { comments, posts, loading, error, deletePost } = this.props;
            return <WrappedComponent 
                        comments={comments} 
                        posts={posts} 
                        loading={loading} 
                        error={error}
                        delete={deletePost} 
                    />
        }
    }
    WithEffect.displayName = `WithEffect(${getDisplayName(WrappedComponent)})`;
    return connect(mapStateToProps, mapDispatchToProps)(WithEffect);
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default withEffect;
