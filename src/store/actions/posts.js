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

const getPosts = response => {
    return {
        type: actions.FETCH_POSTS,
        payload: response
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
        const comments = JSON.parse(localStorage.getItem('comments'));

        if(posts) {
            dispatch(getPosts({posts, comments}));
        } else {
            Promise.all(
                [
                    getData('https://jsonplaceholder.typicode.com/posts'), 
                    getData('https://jsonplaceholder.typicode.com/comments')
                ])
                .then(data => {
                    const posts = data[0];
                    const comments = data[1];
                    localStorage.setItem('posts', JSON.stringify(posts));
                    localStorage.setItem('comments', JSON.stringify(comments));
                    dispatch(getPosts({posts, comments}));
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
