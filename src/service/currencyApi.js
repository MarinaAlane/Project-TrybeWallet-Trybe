const CURRENCY_API_URL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyApi = () => (
  fetch(CURRENCY_API_URL)
    .then((response) => (
      response.json()
        .then((json) => (response.ok ? Promise.resolve(json) : Promise.reject(json)))
    ))
);

export default getCurrencyApi;
