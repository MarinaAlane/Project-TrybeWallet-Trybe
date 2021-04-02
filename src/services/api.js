export default async function fetchAPI() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const object = await response.json();
  delete object.USDT;
  return object;
}
