const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: true,
};

export const CREATE_EXPENSE = 'CREATE_EXPENSE';
export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const RETRIEVE_EXPENSE = 'RETRIEVE_EXPENSE';
export const GET_CURRENCIES = 'GET_CURRENCIES';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';

function updateExpense(expenses, newExpense) {
  expenses.forEach((expense) => {
    if (expense.id === newExpense.id) {
      expense.value = newExpense.value;
    }
  });
  return expenses;
}

function walletReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CREATE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, action.expense] };
  case UPDATE_EXPENSE:
    state = {
      ...state, ...state.wallet, expenses: updateExpense(state.expenses, action.expense),
    };
    return state;
  case DELETE_EXPENSE:
    return { ...state,
      expenses: [...state.expenses
        .slice(0, action.index), ...state.expenses
        .slice(action.index + 1, state.expenses.length)] };
  case RETRIEVE_EXPENSE:
    return state.wallet.expenses[action.id];
  case REQUEST_CURRENCIES:
    return { ...state, isFetching: true };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: [{ ...action.currencies }],
      isFetching: false };
  default:
    return state;
  }
}
export default walletReducer;
