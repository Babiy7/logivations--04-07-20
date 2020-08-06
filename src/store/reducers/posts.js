import * as actions from '../actionTypes';
import { updatedObject } from '../../shared/helper';

const initState = {
    loading: false,
    posts: [],
    comments: [],
    error: null
}

const loading = state => updatedObject(state, { loading: true });
const error = (state, action) => updatedObject(state, { error: action.payload, loading: false });
const init = (state, action, key) => 
    (updatedObject(state,
        { 
            loading: false,
            [key]: action.payload,
            error: null
        })
    );
    

function posts(state = initState, action) {
    switch(action.type) {
        case actions.LOADING: {
            return loading(state);
        }

        case actions.FETCH_POSTS: {
            return init(state, action, 'posts');
        }

        case actions.FETCH_COMMENTS: {
            return init(state, action, 'comments');
        }
      
        // case actions.ADD_POSTS: {
        //     return changedState(false, ...state.posts, null); 
        // }

        // case actions.REMOVE_POSTS: {
        //     return changedState(false, state.expenses.filter(expense => expense === action.payload), null);
        // }

        case actions.ERROR: {
            return error(state, action);
        }

        default : {
            return state;
        }
    }
}

export default posts;
