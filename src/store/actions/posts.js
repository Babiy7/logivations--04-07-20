import * as actions from '../actionTypes';
import {
  setItems, getItems, sorted, getDateString, addRandomComments, random,
} from '../../shared/helper';

export const loading = () => ({
  type: actions.LOADING,
});

export const error = (message) => ({
  type: actions.ERROR,
  payload: message,
});

const updatePosts = (response) => ({
  type: actions.UPDATE_POSTS,
  payload: response,
});

const addPost = (post) => ({
  type: actions.ADD_POSTS,
  payload: post,
});

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getPostsAsync() {
  return (dispatch) => {
    dispatch(loading());
    const posts = getItems('posts');

    if (posts) {
      dispatch(updatePosts(posts));
    } else {
      Promise.all(
        [
          getData('https://jsonplaceholder.typicode.com/posts'),
          getData('https://jsonplaceholder.typicode.com/comments'),
        ],
      )
        .then((data) => {
          let resPosts = data[0].reverse();
          const resComments = data[1];
          resPosts = resPosts.map((post) => {
            const postComments = resComments.filter((comment) => post.id === comment.postId);
            return {
              ...post,
              comments: addRandomComments(postComments, post.id),
              views: random(100),
              date: getDateString(),
            };
          });
          setItems(resPosts, 'posts');
          dispatch(updatePosts(resPosts));
        })
        .catch((e) => {
          dispatch(error(e.message));
        });
    }
  };
}

export function addPostAsync(post) {
  return (dispatch, getState) => {
    const posts = [...getState().posts];
    const sortedPosts = sorted(posts, 'Default filter');
    const id = sortedPosts[0].id + 1;
    const newPost = {
      ...post,
      id,
      userId: 0,
      comments: addRandomComments([], id),
      views: random(20),
      date: getDateString(true),
    };
    sortedPosts.unshift(newPost);
    setItems(sortedPosts, 'posts');
    dispatch(addPost(newPost));
  };
}

export function deletePost(id) {
  return (dispatch, getState) => {
    const posts = [...getState().posts].filter((post) => post.id !== +id);
    setItems(sorted(posts, 'Default filter'), 'posts');
    dispatch(updatePosts(posts));
  };
}

export function editPost(id, newPost) {
  return (dispatch, getState) => {
    const posts = [...getState().posts].map((post) => {
      if (post.id === +id) {
        return {
          ...newPost,
        };
      }
      return post;
    });
    setItems(sorted(posts, 'Default filter'), 'posts');
    dispatch(updatePosts(posts));
  };
}

export default getPostsAsync;
