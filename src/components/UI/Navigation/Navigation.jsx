/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { connect } from 'react-redux';
import { SET_FILTER } from '../../../store/actionTypes';

function Navigation(props) {
  const { filter } = props;
  const handleClick = (name) => {
    props.setFilter(name);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand">News</a>

      <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
        <ul className="navbar-nav pr-5">
          <li className="nav-item dropdown mr-5">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {filter}
            </a>
            <div className="dropdown-menu mr-5" aria-labelledby="navbarDropdown">
              { ['Default filter', 'Comments', 'Views', 'Latest'].map((item, i, array) => (
                <div key={item}>
                  <a
                    className="dropdown-item"
                    href="#"
                    onClick={() => handleClick(item)}
                  >
                    {item}

                  </a>
                  {i === (array.length - 1) ? null : <div className="dropdown-divider" />}
                </div>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
}

const mapStateToProps = (state) => ({
  filter: state.filter,
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filter) => dispatch({ type: SET_FILTER, payload: filter }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
