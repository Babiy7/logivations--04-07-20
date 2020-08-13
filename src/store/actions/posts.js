import * as actions from '../actionTypes';
import { setItems, getItems } from '../../shared/helper';

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

async function getData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

function getPostsAsync() {
  return (dispatch) => {
    dispatch(loading());
    console.log('getPosts');
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
              comments: postComments,
              views: Math.floor(Math.random() * 100),
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

export function addPost(post) {
  return (dispatch, getState) => {
    const posts = [...getState().posts].reverse();
    posts.push({
      ...post,
      id: posts[posts.length - 1].id + 1,
      userId: 0,
      comments: [],
      views: Math.floor(Math.random() * 20),
    });
    posts.reverse();
    setItems(posts, 'posts');
    dispatch(updatePosts(posts));
  };
}

export function deletePost(id) {
  return (dispatch, getState) => {
    const posts = [...getState().posts].filter((post) => post.id !== +id);
    setItems(posts, 'posts');
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
    setItems(posts, 'posts');
    dispatch(updatePosts(posts));
  };
}

export default getPostsAsync;
