import * as actions from '../actionTypes';

const initState = {
    loading: false,
    posts: [],
    error: null
}

const changedState = (loading, posts, error) => {
    return {
        loading: loading,
        posts: posts,
        error: error
    };
} 

function posts(state = initState, action) {
    switch(action.type) {

        case actions.LOADING: {
            state = changedState(true, ...state.posts, null);
            break;
        }

        case actions.FETCH_POSTS: {
            state = changedState(false, action.payload, null);
            break;
        }
      
        case actions.ADD_POSTS: {
            state = changedState(false, ...state.posts, null); 
            break;
        }

        case actions.REMOVE_POSTS: {
            state = changedState(false, state.expenses.filter(expense => expense === action.payload), null);
            break;
        }

        case actions.ERROR: {
            state = changedState(false, ...state.posts, action.payload);
            break;
        }

        default : {
            state = changedState(false, state.posts, null);
        }
        return state;
    }
}

export default posts;
