import * as actions from '../actionTypes';

export const loading = () => {
    return {
        type: actions.LOADING
    }
}

export const error = message => {
    return {
        type: actions.ERROR,
        payload: message
    }
}

const getPosts = posts => {
    return {
        type: actions.FETCH_POSTS,
        payload: posts
    }
}

const getComments = comments => {
    return {
        type: actions.FETCH_COMMENTS,
        payload: comments
    }
}

async function getData(url) {
    const response = await fetch(url);

    return await response.json();
}

function getPostsAsync() {
    return dispatch => {
        dispatch(loading());
        
        const posts = JSON.parse(localStorage.getItem('posts'));
        
        if(posts) {
            dispatch(getPosts(posts));
        } else {
            getData('https://jsonplaceholder.typicode.com/posts')
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

export function getCommentsAsync() {
    return dispatch => {
        dispatch(loading());

        getData('https://jsonplaceholder.typicode.com/comments')
            .then(data => {
                dispatch(getComments(data));
            })
            .catch(e => {
                dispatch(error(e.message));
            });
    }
}

export default getPostsAsync;
