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
const init = (state, response) => {
   return updatedObject(state,
        { 
            loading: false,
            ...response,
            error: null
        });
}
    

function posts(state = initState, action) {
    switch(action.type) {
        case actions.LOADING: {
            return loading(state);
        }

        case actions.FETCH_POSTS: {
            return init(state, action.payload);
        }
      
        case actions.ADD_POSTS: {
            return init(state, action.payload); 
        }

        case actions.REMOVE_POSTS: {
            return init(state, action.payload);
        }

        case actions.ERROR: {
            return error(state, action);
        }

        default : {
            return state;
        }
    }
}

export default posts;
