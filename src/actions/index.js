import requestApi from '../services/requestApi';

export const INPUT_LOGIN = 'INPUT_LOGIN';
export const INPUT_WALLET = 'INPUT_WALLET';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_VALUE = 'REQUEST_VALUE';

export const user = (email) => ({
  type: INPUT_LOGIN,
  email,
});

export const wallet = (expenses) => ({
  type: INPUT_WALLET,
  currencies: [],
  expenses,
});

export const requestCurrecy = (response) => ({
  type: REQUEST_CURRENCY,
  response,
});

export const getCurrencies = () => async (dispatch) => {
  const currencies = await requestApi();
  dispatch(requestCurrecy(Object.keys(currencies)));
};
