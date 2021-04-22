import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  totalPrice() {
    const { expenses } = this.props;
    let sum = 0;
    expenses.forEach(({ value, currency, exchangeRates }) => {
      sum += value * exchangeRates[currency].ask;
    });

    return parseFloat(sum).toFixed(2);
  }

  render() {
    const { user } = this.props;
    return (
      <>
        <p data-testid="email-field">{`Usuário: ${user}`}</p>
        <p>
          Dispesas Totais: R$
          <span data-testid="total-field">{this.totalPrice()}</span>
        </p>
        <p data-testid="header-currency-field">BRL</p>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
  currency: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  user: PropTypes.string,
  expenses: PropTypes.arrayOf,
}.isRequired;

export default connect(mapStateToProps)(Header);
