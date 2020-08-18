/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef } from 'react';
import './Navigation.css';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { SET_FILTER, SHOW_FILTER } from '../../../store/actionTypes';

const options = ['Default filter', 'Comments', 'Views', 'Latest'];

function Navigation(props) {
  const {
    filter, setFilter, show,
  } = props;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
    props.showFilter();
  };

  const handleMenuItemClick = (option, index) => {
    setSelectedIndex(index);
    setFilter(option);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className="app-bar__container">
            <div className="app-bar__left">
              {show ? '' : <button type="button" className="app-bar__back" onClick={handleClick} />}
              <Typography variant="h6">
                Posts
              </Typography>
            </div>

            {show ? (
              <div className="app-bar__right">
                <Grid container direction="column" alignItems="center">
                  <Grid item xs={12}>
                    <ButtonGroup variant="contained" color="primary" ref={anchorRef} aria-label="split button">
                      <Button>{filter}</Button>
                      <Button
                        color="primary"
                        size="small"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                      >
                        <ArrowDropDownIcon />
                      </Button>
                    </ButtonGroup>
                    <Popper
                      open={open}
                      anchorEl={anchorRef.current}
                      role={undefined}
                      transition
                      disablePortal
                    >
                      {({ TransitionProps, placement }) => (
                        <Grow
                          {...TransitionProps}
                          style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                          }}
                        >
                          <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                              <MenuList id="split-button-menu">
                                {options.map((option, index) => (
                                  <MenuItem
                                    key={option}
                                    selected={index === selectedIndex}
                                    onClick={(event) => handleMenuItemClick(option, index)}
                                  >
                                    {option}
                                  </MenuItem>
                                ))}
                              </MenuList>
                            </ClickAwayListener>
                          </Paper>
                        </Grow>
                      )}
                    </Popper>
                  </Grid>
                </Grid>
              </div>
            ) : <div /> }
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps = (state) => ({
  filter: state.postsState.filter,
  show: state.uiState.appBar.show,
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch({ type: SET_FILTER, payload: filter }),
  showFilter: () => dispatch({ type: SHOW_FILTER }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
