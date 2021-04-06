// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { FETCH_SAVE_CURRENCIES } from '../actions/wallet';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  idCounter: 0,
  editor: false,
  idEdit: null,
};

const saveCurrencies = (state = INITIAL_STATE, action) => ({
  ...state, currencies: action.payload,
});

const addExpense = (state = INITIAL_STATE, action) => {
  const { idCounter, expenses } = state;
  const newExpense = {
    id: idCounter,
    ...action.payload,
  };
  return {
    ...state,
    expenses: [...expenses, newExpense],
    idCounter: idCounter + 1,
  };
};

const removeExpense = (state = INITIAL_STATE, action) => ({
  ...state,
  expenses: state.expenses.filter((expense) => expense.id !== action.payload),
});

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_SAVE_CURRENCIES.SAVE_CURRENCIES:
    return (
      saveCurrencies(state, action)
    );
  case FETCH_SAVE_CURRENCIES.ADD_EXPENSE:
    return (
      addExpense(state, action)
    );
  case FETCH_SAVE_CURRENCIES.REMOVE_EXPENSE:
    return (
      removeExpense(state, action)
    );
  default:
    return state;
  }
};

export default wallet;
