import * as actions from '../actionTypes';
import { setItems, getItems } from '../../shared/helper';

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
        
        const posts = getItems('posts');
        const comments = getItems('comments');

        if(posts) {
            dispatch(getPosts({ posts, comments }));
        } else {
            Promise.all(
                [
                    getData('https://jsonplaceholder.typicode.com/posts'), 
                    getData('https://jsonplaceholder.typicode.com/comments')
                ])
                .then(data => {
                    const posts = data[0].reverse();
                    const comments = data[1];
                    setItems(posts, 'posts');
                    setItems(comments, 'comments');
                    dispatch(getPosts({posts, comments}));
                })
                .catch(e => {
                    dispatch(error(e.message));
                });            
        }
    }
}

export function addPost(post) {
    return dispatch => {
        const posts = getItems('posts').reverse();
        posts.push({
            ...post,
            id: posts[posts.length - 1].id + 1,
            userId: 0
        });
        posts.reverse();
        setItems(posts, 'posts');
        dispatch(add({ posts: posts }));
    }
}

export function deletePost(id) {
    return dispatch => {
        const posts = getItems('posts').filter(post => post.id !== +id);
        setItems(posts, 'posts');
        dispatch(remove({ posts: posts }));
    }
}

export default getPostsAsync;
