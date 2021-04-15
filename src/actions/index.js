import fetchCurrencyApi from '../services/fetchCurrencyApi';

// Coloque aqui suas actions
export const userEmailDispach = (email) => ({
  type: 'USER_EMAIL_DISPACH',
  userEmail: email,
});

export const requestCurrency = (currencies) => ({
  type: 'REQUEST_CURRENCY',
  currencies,
});

export const fetchCurrency = () => (dispach) => {
  fetchCurrencyApi()
    .then((currenciApiResponse) => dispach(requestCurrency(currenciApiResponse)));
};

export const registerNewExpense = (name, value) => ({
  type: 'NEW_EXPENSE',
  name,
  value,
});

export const sendFormDataToState = (expense) => ({
  type: 'ADD_NEW_EXPENSE',
  expense,
});

export const setTotalValue = (total) => ({
  type: 'SET_TOTAL',
  total,
});

export const setExpenseValue = () => ({
  type: 'DEFAULT_VALUE',
  default: 0,
});

export const removeExpenseFromGlobalState = (expenses, id, newTotal) => {
  const newExpenses = expenses
    .filter((expense) => expense.id !== id);
  return ({
    type: 'REMOVE_TABLE_ITEM',
    expenses: newExpenses,
    total: newTotal,
  });
};
