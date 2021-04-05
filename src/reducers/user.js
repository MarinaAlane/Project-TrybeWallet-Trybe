import { SIGNIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SIGNIN:
    return { email: action.payload };

  default:
    return state;
  }
};

export default user;
