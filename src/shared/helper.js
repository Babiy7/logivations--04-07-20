export const updatedObject = (state, updated) => ({ ...state, ...updated });

export const getItems = (key) => JSON.parse(localStorage.getItem(key));

export const setItems = (items, key) => localStorage.setItem(key, JSON.stringify(items));
