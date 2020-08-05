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
    return (dispatch, getState) => {
        dispatch(loading());
        
        const posts = JSON.parse(localStorage.getItem('posts'));
        
        if(posts) {
            dispatch(getPosts(posts));
        } else {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then(response => response.json())
                .then(data => { 
                    const posts = data.slice(0, 20);
                    localStorage.setItem('posts', JSON.stringify(posts));
                    dispatch(getPosts(posts));
                })
                .catch(e => {
                    dispatch(error(e.message));
                });    
        }
    }
}

export default getPostsAsync;
