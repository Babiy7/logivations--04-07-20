/* eslint-disable react/prop-types */
import React, { useRef, useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Form.css';

function Form(props) {
  const {
    handleClick, title, btnTitle, post, handleClose,
  } = props;
  const [state, setState] = useState({
    title: '',
    body: '',
  });
  const inputEl = useRef(null);

  useEffect(() => {
    if (post) {
      setState({
        title: post.title,
        body: post.body,
      });
    }
    inputEl.current.focus();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  }

  return (
    <form className="form" noValidate autoComplete="off">
      <p className="form__title">{title}</p>
      <div>
        <TextField
          className="form__input"
          inputRef={inputEl}
          id="outlined-required"
          label="Title"
          name="title"
          fullWidth
          value={state.title}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div>
        <TextField
          className="form__input"
          id="outlined-multiline-static"
          label="Text"
          name="body"
          fullWidth
          value={state.body}
          multiline
          rows={7}
          variant="outlined"
          onChange={handleChange}
        />
      </div>
      <div className="form__footer">
        <div className="footer-container__buttons">
          <Button variant="contained" color="primary" onClick={() => handleClick(state)}>
            {btnTitle}
          </Button>
          <div className="footer-container__button">
            <Button variant="contained" color="secondary" className="form__button" onClick={handleClose}>Cancel</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Form;
