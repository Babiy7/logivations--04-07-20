import * as actions from '../actionTypes';
import { updatedObject, sorted } from '../../shared/helper';

const initState = {
  loading: false,
  posts: [],
  comments: [],
  filter: 'Default filter',
  error: null,
};

const loading = (state) => updatedObject(state, { loading: true });
const error = (state, action) => updatedObject(state, { error: action.payload, loading: false });
const updateState = (state, response) => updatedObject(state,
  {
    loading: false,
    posts: response,
    error: null,
  });

const filter = (state, payload) => updatedObject(state,
  {
    loading: false, ...payload, error: null,
  });

function posts(state = initState, action) {
  switch (action.type) {
    case actions.LOADING: {
      return loading(state);
    }

    case actions.UPDATE_POSTS: {
      const sortedPosts = sorted(action.payload, state.filter);
      return updateState(state, sortedPosts);
    }

    case actions.ERROR: {
      return error(state, action);
    }

    case actions.SET_FILTER: {
      const sortedPosts = sorted(state.posts, action.payload);
      console.log(sortedPosts);

      return filter(state, { filter: action.payload, posts: sortedPosts });
    }

    default: {
      return state;
    }
  }
}

export default posts;
