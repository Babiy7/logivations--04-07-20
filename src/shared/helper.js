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
      return posts.sort((postFirst, postSecond) => {
        const timestampFirst = new Date(postFirst.date).getTime();
        const timestampSecond = new Date(postSecond.date).getTime();
        return timestampSecond - timestampFirst;
      });
    }

    case 'Default filter': {
      return posts.sort((postFirst, postSecond) => postSecond.id - postFirst.id);
    }

    default: {
      return posts;
    }
  }
};

export function getZero(number) {
  let newNumber;
  if (number < 10) {
    newNumber = `0${number}`;
    return newNumber;
  }

  return number;
}

export function getDateString() {
  const newDate = new Date(new Date().getTime() - Math.floor(Math.random() * 2000000000));

  const year = newDate.getFullYear();
  const month = newDate.getMonth();
  const day = newDate.getDate();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  const stringDate = `${month}/${day}/${year} ${getZero(hours)}:${getZero(minutes)}:${getZero(seconds)}`;

  return stringDate;
}
