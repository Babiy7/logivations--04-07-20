import { combineReducers } from 'redux';
import posts from './posts/posts';
import snackbar from './snackbar/snackbar';

const rootReducer = combineReducers({
  postsState: posts,
  snackbarState: snackbar,
});

export default rootReducer;
