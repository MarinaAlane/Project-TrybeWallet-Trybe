import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { loginUser } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      validated: true,
      redirect: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.validateInfo = this.validateInfo.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validateInfo());
  }

  handleClick() {
    const { email } = this.state;
    const { addLogin } = this.props;
    addLogin(email);
    this.setState({
      redirect: true,
    });
  }

  validateInfo() {
    const { email, password } = this.state;
    // https://github.com/tryber/sd-09-project-trivia-react-redux/pull/138
    const emailValidated = /^[\S.]+@[a-z]+\.\w{2,3}$/g.test(email);
    // https://pt.stackoverflow.com/questions/93883/montar-regex-para-validar-senha
    const passwordValidated = /^[^\W_]{6}$/.test(password);
    console.log(passwordValidated);
    if (emailValidated && passwordValidated) {
      this.setState({
        validated: false,
      });
    } else {
      this.setState({
        validated: true,
      });
    }
  }

  render() {
    const { validated, redirect } = this.state;
    if (redirect) {
      return <Redirect to="/carteira" />;
    }
    return (
      <main>
        <h3>Login</h3>
        <input
          data-testid="email-input"
          name="email"
          onChange={ this.handleChange }
          placeholder="Endereço de e-mail"
          type="email"
        />
        <input
          data-testid="password-input"
          name="password"
          onChange={ this.handleChange }
          placeholder="Senha"
          type="password"
        />
        <button
          disabled={ validated }
          onClick={ this.handleClick }
          type="submit"
        >
          Entrar
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addLogin: (email) => dispatch(loginUser(email)),
});

Login.propTypes = {
  addLogin: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
