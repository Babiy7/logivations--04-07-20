import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import Navigation from './components/UI/Navigation/Navigation';
import Posts from './containers/Posts/Posts';
import BasicPost from './containers/BasicPost/BasicPost';
import Modal from './components/UI/Modal/Modal';
import FabButton from './components/UI/FabButton/FabButton';
import AddPost from './containers/AddPost/AddPost';

function App() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <div className='app-footer'>
          <FabButton handleOpen={handleOpen} />
        </div>
        <Modal open={open} handleClose={handleClose} >
          <AddPost handleClose={handleClose} />
        </Modal>
      </div>
    </Router>
  );
}

export default App;
