// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'LOGIN_ACTION':
    return {
      email: action.payload.email,
    };
  default:
    return state;
  }
}

export default user;
