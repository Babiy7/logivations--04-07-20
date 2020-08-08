import React from 'react';
import { connect } from 'react-redux';
import getPostAsync from '../store/actions/posts';

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
        getPost: action => dispatch(action)
    }
}

function withEffect(WrappedComponent) {

    class WithEffect extends React.Component {
        componentDidMount() {
            this.props.getPost(getPostAsync());
        }

        render() {
            const { comments, posts, loading, error } = this.props;
            return <WrappedComponent 
                        comments={comments} 
                        posts={posts} 
                        loading={loading} 
                        error={error} 
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
