import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { handleEmail } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      disabled: true,
    };
  }

  handleInputs({ name, value }) {
    this.setState((state) => ({
      ...state,
      [name]: value,
    }));
    this.validations();
  }

  validations() {
    const { email, password } = this.state;
    const emailValidation = /^[\w.]+@[a-z]+\.\w{2,3}$/g;
    const validEmail = emailValidation.test(email);
    const passwordValidation = /[\S]{5,}/;
    const validPassword = passwordValidation.test(password);
    this.setState((state) => ({
      ...state,
      disabled: !validEmail || !validPassword,
    }));
  }

  render() {
    const { disabled, email } = this.state;
    const { emailDispatcher } = this.props;
    return (
      <form>
        <fieldset>
          <label htmlFor="email-input">
            Email:
            <input
              id="email-input"
              type="email"
              name="email"
              required
              data-testid="email-input"
              placeholder="Enter your email address"
              onChange={ ({ target }) => this.handleInputs(target) }
            />
          </label>

          <label htmlFor="password-input">
            Password:
            <input
              id="password-input"
              type="password"
              name="password"
              required
              minLength="6"
              data-testid="password-input"
              placeholder="Enter your password"
              onChange={ ({ target }) => this.handleInputs(target) }
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              disabled={ disabled }
              onClick={ () => emailDispatcher(email) }
            >
              Entrar
            </button>
          </Link>
        </fieldset>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
});

const mapDispatchToProps = (dispatch) => ({
  emailDispatcher: (email) => dispatch(handleEmail(email)),
});

Login.propTypes = {
  emailDispatcher: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
