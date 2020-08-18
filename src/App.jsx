/* eslint-disable react/prop-types */
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import { CLOSE_SNACKBAR } from './store/actionTypes';
import Navigation from './components/UI/Navigation/Navigation';
import Posts from './containers/Posts/Posts';
import BasicPost from './containers/BasicPost/BasicPost';
import Snackbar from './components/UI/Snackbar/Snackbar';

function App(props) {
  const { open, message, closeSnackbar } = props;

  function handleClose() {
    closeSnackbar();
  }

  return (
    <Router>
      <div className="app">
        <Navigation />
        <div className="app-container">
          <Switch>
            <Route path="/" exact>
              <Posts />
            </Route>
            <Route path="/post/:id">
              <BasicPost />
            </Route>
          </Switch>
        </div>
        <Snackbar open={open} message={message} handleClose={handleClose} />
      </div>
    </Router>
  );
}

const mapStateToProps = (state) => {
  const { open, message } = state.uiState;
  return {
    open,
    message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  closeSnackbar: () => dispatch({ type: CLOSE_SNACKBAR }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
