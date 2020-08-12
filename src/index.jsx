import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import App from './App';
import * as serviceWorker from './serviceWorker';
import posts from './store/reducers/posts';

const store = createStore(posts, applyMiddleware(thunk));

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

// function queueTime(customers, till) {
//   let time = 0;
//   let firstTill = 0;
//   let secondTill = 0;

//   if(till === 1 && customers.length > 0) {
//     return customers.reduce((prev, current) => prev + current);
//   }

//   if(customers.length === 0) {
//     return 0;
//   }

//   for(let i = 0; i < customers.length; i++) {
//     if(customers[0] > customers[1]) {
//       firstTill = customers[0];
//       secondTill = customers[1];
//       time = firstTill;
//     }

//     if(firstTill > secondTill) {
//       secondTill += customers[++i];
//     } else {

//     }

//   }

//   console.log('next code');

//   return time;
// }

// console.log(queueTime([10, 4, 2, 1], 2));
