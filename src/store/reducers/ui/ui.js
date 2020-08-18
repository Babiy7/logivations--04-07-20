import * as actions from '../../actionTypes';
import { updatedObject } from '../../../shared/helper';

const initState = {
  open: false,
  message: '',
  appBar: {
    show: true,
  },
};

function snackbar(state = initState, action) {
  switch (action.type) {
    case actions.OPEN_SNACKBAR: {
      return updatedObject(state, { open: true, message: action.payload });
    }

    case actions.CLOSE_SNACKBAR: {
      return updatedObject(state, { open: false, message: '' });
    }

    case actions.HIDE_FILTER: {
      return updatedObject(state, { appBar: { show: false } });
    }

    case actions.SHOW_FILTER: {
      return updatedObject(state, { appBar: { show: true } });
    }

    default: {
      return state;
    }
  }
}

export default snackbar;
