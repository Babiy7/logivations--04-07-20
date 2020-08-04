import { FETCH_POSTS, LOADING, ERROR } from '../actionTypes';

export const loading = () => {
    return {
        type: LOADING
    }
}

export const error = message => {
    return {
        type: ERROR,
        payload: message
    }
}

const getPosts = posts => {
    return {
        type: FETCH_POSTS,
        payload: posts
    }
}

function getPostsAsync() {
    return dispatch => {
        dispatch(loading());
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(posts => {
                dispatch(getPosts(posts))
            })
            .catch(e => {
                dispatch(error(e.message))
            });            
    }
}

export default getPostsAsync;
