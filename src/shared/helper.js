export const updatedObject = (state, updated) => ({ ...state, ...updated });

export const getItems = (key) => JSON.parse(localStorage.getItem(key));

export const setItems = (items, key) => localStorage.setItem(key, JSON.stringify(items));

export const sorted = (state, action) => {
  const posts = [...state];

  switch (action) {
    case 'Comments': {
      return posts.sort((postFirst, postSecond) => postSecond.comments.length
       - postFirst.comments.length);
    }

    case 'Views': {
      return posts.sort((postFirst, postSecond) => postSecond.views - postFirst.views);
    }

    case 'Latest': {
      return posts.sort((postFirst, postSecond) => postSecond.id - postFirst.id);
    }

    case 'Default filter': {
      return posts.sort((postFirst, postSecond) => postSecond.id - postFirst.id);
    }

    default: {
      return posts;
    }
  }
};
