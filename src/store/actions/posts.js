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

const add = response => {
    return {
        type: actions.ADD_POSTS,
        payload: response
    }
}

const remove = response => {
    return {
        type: actions.REMOVE_POSTS,
        payload: response
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

function getItems(key) {
    return JSON.parse(localStorage.getItem(key))
}

export function addPost(post) {
    return dispatch => {
        const posts = getItems('posts');
        posts.unshift({
            ...post,
            id: posts.length + 1,
            userId: 0
        });
        localStorage.setItem('posts', JSON.stringify(posts));
        dispatch(add({ posts: posts }));
    }
}

export function deletePost(id) {
    return dispatch => {
        const posts = getItems('posts').filter(post => post.id !== +id);
        localStorage.setItem('posts', JSON.stringify(posts));
        dispatch(remove({ posts: posts }));
    }
}

export default getPostsAsync;
