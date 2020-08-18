import { combineReducers } from 'redux';
import posts from './posts/posts';
import ui from './ui/ui';

const rootReducer = combineReducers({
  postsState: posts,
  uiState: ui,
});

export default rootReducer;
