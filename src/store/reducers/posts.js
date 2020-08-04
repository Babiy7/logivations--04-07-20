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
            return state = changedState(true, state.posts, null);
        }

        case actions.FETCH_POSTS: {
            return state = changedState(false, action.payload, null);
        }
      
        case actions.ADD_POSTS: {
            return state = changedState(false, ...state.posts, null); 
        }

        case actions.REMOVE_POSTS: {
            return state = changedState(false, state.expenses.filter(expense => expense === action.payload), null);
        }

        case actions.ERROR: {
            return state = changedState(false, state.posts, action.payload);
        }

        default : {
            return state;
        }
    }
}

export default posts;
