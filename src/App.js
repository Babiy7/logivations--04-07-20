import React from 'react';
import classes from './App.css';

import Navigation from './components/UI/Navigation/Navigation';
import Posts from './containers/Posts/Posts';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className='app-container' >
       <Posts />
      </div>
    </div>
  );
}

export default App;
