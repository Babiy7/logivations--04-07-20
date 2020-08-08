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
    return connect(mapStateToProps, mapDispatchToProps)(class extends React.Component {
        componentDidMount() {
            this.props.getPost(getPostAsync());
        }

        render() {
            return <WrappedComponent {...this.props} />
        }
    })
}

export default withEffect;
