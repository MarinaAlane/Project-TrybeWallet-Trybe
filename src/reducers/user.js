// Esse reducer será responsável por tratar as informações da pessoa usuária
import {
  SAVES_USER_EMAIL,
} from "../actions";

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case SAVES_USER_EMAIL:
    return {
      ...state,
      email: payload,
    }
  default:
    return ({
      ...state,
    });
  }
};

export default user;
