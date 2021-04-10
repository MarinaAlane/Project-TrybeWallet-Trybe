import React from 'react';
import { connect } from 'react-redux';
import { fetchCurrency, addExpense } from '../actions';

class ExpenseForm extends React.Component {
  constructor() {
    super();

    this.formFieldsControl = this.formFieldsControl.bind(this);
    this.generateExchangeRates = this.generateExchangeRates.bind(this);

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    this.fetchCurrency();
  }

  async fetchCurrency() {
    const { getCurrency } = this.props;
    await getCurrency();
  }

  formFieldsControl(event) {
    const { target } = event;
    this.setState({
      [target.name]: target.value,
    });
  }

  generateExchangeRates() {
    this.fetchCurrency();
    const { expenses, currencies, addExpense } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currencies,
    };
    addExpense(expense);
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  }

  renderSelectCurrency(currencies) {
    const { currency: currencyState } = this.state;
    return (
      <select
        name="currency"
        id="moeda"
        data-testid="currency-input"
        defaultValue={ currencyState }
        onChange={ this.formFieldsControl }
      >
        {Object.keys(currencies).map((currency) => (
          <option
            key={ currency }
            value={ currency }
            data-testid={ currency }
          >
            { currency}
          </option>
        ))}
      </select>
    );
  }

  renderSelectPaymentMethod() {
    const { method } = this.state;
    return (
      <select
        name="method"
        value={ method }
        id="pagamento"
        data-testid="method-input"
        onChange={ this.formFieldsControl }
      >
        <option value="dinheiro">Dinheiro</option>
        <option value="cartaoCredito">Cartão de crédito</option>
        <option value="cartaoDebito">Cartão de débito</option>
      </select>
    );
  }

  renderSelectExpenseTag() {
    const { tag } = this.state;
    return (
      <select
        name="tag"
        value={ tag }
        id="despesa"
        data-testid="tag-input"
        onChange={ this.formFieldsControl }
      >
        <option value="alimentacao">Alimentação</option>
        <option value="lazer">Lazer</option>
        <option value="trabalho">Trabalho</option>
        <option value="transporte">Transporte</option>
        <option value="saude">Saúde</option>
      </select>
    );
  }

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="despesa">
          Valor da despesa
          <input
            type="text"
            name="value"
            value={ value }
            data-testid="value-input"
            onChange={ this.formFieldsControl }
          />
        </label>
        <label htmlFor="descricao">
          descrição da despesa
          <input
            type="text"
            name="description"
            value={ description }
            data-testid="description-input"
            onChange={ this.formFieldsControl }
          />
        </label>
        <label htmlFor="moeda">
          Moeda
          { this.renderSelectCurrency(currencies) }
        </label>
        <label htmlFor="pagamento">
          Método de pagamento
          { this.renderSelectPaymentMethod() }
        </label>
        <label htmlFor="tipoDespesa">
          Tipo de despesa
          { this.renderSelectExpenseTag() }
        </label>
        <button
          type="button"
          onClick={ this.generateExchangeRates }
        >
          Adicionar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrency: () => dispatch(fetchCurrency()),
  addExpense: (expense) => dispatch(addExpense(expense)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseForm);

/*
Dúvidas:

1 - Como controlar o estado de um campo que está sendo criado por uma função?
2 - Como enviar as info do estado local do form para o redux?

Próximos passos:

Adicionar a despesa numa tabela:
Como?

No conponente Wallet controlar o botão "Adicionar despesa", ele vai adicionar a
despesa, nesse momento será criada uma tr com as informações do formulário
preenchido;

*/
