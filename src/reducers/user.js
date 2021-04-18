// Esse reducer será responsável por tratar as informações da pessoa usuária
import { LOGIN } from '../actions';

const INITIAL_STATE = { email: '', password: '' };

function user(state = INITIAL_STATE, actions) {
  switch (actions.type) {
  case LOGIN:
    return {
      ...state,
      email: actions.email,
      password: actions.password,
    };
  default:
    return state;
  }
}

export default user;
