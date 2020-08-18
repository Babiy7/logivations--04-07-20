import * as actions from '../../actionTypes';
import { updatedObject } from '../../../shared/helper';

const initState = {
  open: false,
  message: '',
};

function snackbar(state = initState, action) {
  switch (action.type) {
    case actions.OPEN_SNACKBAR: {
      return updatedObject(state, { open: true, message: action.payload });
    }

    case actions.CLOSE_SNACKBAR: {
      return updatedObject(state, { open: false, message: '' });
    }

    default: {
      return state;
    }
  }
}

export default snackbar;
