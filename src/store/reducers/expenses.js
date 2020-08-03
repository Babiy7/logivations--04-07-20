import * as actions from '../actionTypes';

const initState = {
    loading: false,
    expenses: [],
    error: null
}

const changedState = expenses => {
    return {
        loading: false,
        expenses: expenses,
        error: false
    };
} 

function expenses(state = initState, action) {
    switch(action.type) {

        case actions.LOADING: {
           return state = {
                ...state,
                loading: true,
                error: false
            }
        }
      
        case actions.ADD_EXPENSE: {
           return state = changedState([...state.expenses, {}]);        
        }

        case actions.REMOVE_EXPENSE: {
           return state = changedState(state.expenses.filter(expense => expense === action.payload));
        }

        case actions.ERROR: {
           return state = {
                loading: false,
                ...state,
                error: true
            }
            
        }

        default : {

        }
    }

    return state;
}

export default expenses;
