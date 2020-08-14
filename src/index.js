/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App.jsx';
import * as serviceWorker from './serviceWorker';
import posts from './store/reducers/posts';

const store = createStore(posts, applyMiddleware(thunk));

// const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log('array', array);

// array.reverse();

// console.log('reversed', array);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
