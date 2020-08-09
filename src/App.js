import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Navigation from './components/UI/Navigation/Navigation';
import Posts from './containers/Posts/Posts';
import BasicPost from './containers/BasicPost/BasicPost';

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className='app-container' >
          <Switch>
            <Route path='/' exact>
              <Posts />
            </Route>
            <Route path='/post/:id'>
              <BasicPost />
            </Route>
          </Switch>
        </div>       
      </div>
    </Router>
  );
}

export default App;
