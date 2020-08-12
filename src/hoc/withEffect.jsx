import React from 'react';
import { connect } from 'react-redux';
import getPostAsync, { deletePost } from '../store/actions/posts';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const mapStateToProps = (state) => ({
  ...state,
});

const mapDispatchToProps = (dispatch) => ({
  getPost: () => dispatch(getPostAsync()),
  deletePost: (id) => dispatch(deletePost(id)),
});

function withEffect(WrappedComponent) {
  class WithEffect extends React.Component {
    componentDidMount() {
      this.props.getPost();
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
        />
      );
    }
  }
  WithEffect.displayName = `WithEffect(${getDisplayName(WrappedComponent)})`;
  return connect(mapStateToProps, mapDispatchToProps)(WithEffect);
}

export default withEffect;
