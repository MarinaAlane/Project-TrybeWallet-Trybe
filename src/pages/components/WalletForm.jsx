import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCurrencies, addExpense, updateTotal } from '../../actions';

class WalletForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };

    this.getExchangeRates = this.getExchangeRates.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.setCurrencies = this.setCurrencies.bind(this);
    this.reduceTotal = this.reduceTotal.bind(this);
    this.resetStates = this.resetStates.bind(this);
    this.renderFormInputs = this.renderFormInputs.bind(this);
    this.renderFormSelects = this.renderFormSelects.bind(this);
  }

  componentDidMount() {
    this.setCurrencies();
  }

  async getExchangeRates() {
    const endpoint = 'https://economia.awesomeapi.com.br/json/all';
    const response = await fetch(endpoint);
    const object = await response.json();
    delete object.USDT;
    return object;
  }

  async setCurrencies() {
    const { getCurrencySymbols } = this.props;
    const object = await this.getExchangeRates();
    getCurrencySymbols(Object.keys(object));
  }

  reduceTotal() {
    const { expenses } = this.props;
    const total = expenses
      .reduce((prev, { value, currency, exchangeRates }) => (
        prev + value * exchangeRates[currency].ask
      ), 0);
    return total;
  }

  async saveExpense() {
    const { getExpense, updateNewTotal, expenses } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const recentRates = await this.getExchangeRates();
    const myExpense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: recentRates,
    };

    getExpense(myExpense);

    const newTotal = await this.reduceTotal();
    updateNewTotal(newTotal);

    this.resetStates();
  }

  resetStates() {
    const INITIAL_STATE = {
      value: 0,
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.setState(INITIAL_STATE);
  }

  renderFormInputs() {
    const { value, description } = this.state;
    return (
      <>
        <label htmlFor="value">
          Valor da despesa
          <input
            data-testid="value-input"
            value={ value }
            type="text"
            name="value"
            id="value"
            onChange={ (e) => this.setState({ value: e.target.value }) }
          />
        </label>
        <label htmlFor="description">
          Descrição da despesa
          <input
            data-testid="description-input"
            value={ description }
            type="text"
            name="description"
            id="description"
            onChange={ (e) => this.setState({ description: e.target.value }) }
          />
        </label>
      </>
    );
  }

  renderFormSelects() {
    const { method, tag } = this.state;
    return (
      <>
        <label htmlFor="method">
          Forma de Pagamento
          <select
            data-testid="method-input"
            value={ method }
            name="method"
            id="method"
            onChange={ (e) => this.setState({ method: e.target.value }) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Categoria da despesa
          <select
            data-testid="tag-input"
            value={ tag }
            name="tag"
            id="tag"
            onChange={ (e) => this.setState({ tag: e.target.value }) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
      </>
    );
  }

  render() {
    const { currency } = this.state;
    const { currencyList } = this.props;
    return (
      <form>
        {this.renderFormInputs()}
        <label htmlFor="currency">
          Moeda da despesa
          <select
            data-testid="currency-input"
            value={ currency }
            name="currency"
            id="currency"
            onChange={ (e) => this.setState({ currency: e.target.value }) }
          >
            {currencyList
              .map((item) => (
                <option
                  key={ item }
                  data-testid={ item }
                  value={ item }
                >
                  {item}
                </option>))}
          </select>
        </label>
        {this.renderFormSelects()}
        <button
          type="button"
          onClick={ this.saveExpense }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencyList: state.wallet.currencies,
  expenses: state.wallet.expenses,
  totalOfExpenses: state.wallet.expensesTotal,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencySymbols: (currencies) => dispatch(getCurrencies(currencies)),
  getExpense: (expense) => dispatch(addExpense(expense)),
  updateNewTotal: (total) => dispatch(updateTotal(total)),
});

WalletForm.propTypes = {
  expenses: PropTypes.arrayOf(Object).isRequired,
  currencyList: PropTypes.arrayOf(String).isRequired,
  getCurrencySymbols: PropTypes.func.isRequired,
  getExpense: PropTypes.func.isRequired,
  updateNewTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletForm);