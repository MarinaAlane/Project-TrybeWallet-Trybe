import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddExpense from './AddExpense';
import { fetchCurrencies, createExpense, deleteExpense, updateExpense } from '../actions';
import ShowExpenses from './ShowExpenses';
import EditExpense from './EditExpense';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeRates: {},
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expense: {},
      expenses: [],
      isEditing: false,
    };
    this.handleInputEvents = this.handleInputEvents.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
    this.createLocalExpense = this.createLocalExpense.bind(this);
    this.removeExpense = this.removeExpense.bind(this);
    this.enableEditExpenseMode = this.enableEditExpenseMode.bind(this);
    this.getTotalExpenseValue = this.getTotalExpenseValue.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  getTotalExpenseValue({ expenses }) {
    let totalExpenses = 0;
    if (expenses.length > 0) {
      expenses.forEach((expense) => {
        const exchangeRates = Object.values(expense.exchangeRates);
        const currentAsk = exchangeRates
          .find((rate) => rate.code === expense.currency).ask;
        const totalExpense = (parseFloat(expense.value) * parseFloat(currentAsk));
        totalExpenses += totalExpense;
      });
    }
    return totalExpenses;
  }

  handleInputEvents({ target }) {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      if (!(this.state) || Object.keys(this.state).length >= 1) {
        this.createLocalExpense();
      }
    });
  }

  saveExpense() {
    const {
      newExpenseDispatch,
      editExpenseDispatch,
    } = this.props;
    const { expense, isEditing } = this.state;
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
      expense: {},
      isEditing: false,
    });
    if (expense && isEditing) {
      const { wallet } = this.props;
      const { expenses } = wallet;
      const index = expenses.indexOf(expenses.find((expens) => expens.id === expense.id));
      editExpenseDispatch(expense, index);
    } else {
      newExpenseDispatch(expense);
    }
  }

  removeExpense({ target }) {
    const { id } = target;
    const { deleteExpenseDispatch, wallet } = this.props;
    const { expenses } = wallet;
    const filteredExpense = expenses.find((expense) => expense.id === parseInt(id, 10));
    const expenseIndex = expenses.indexOf(filteredExpense);
    deleteExpenseDispatch(expenseIndex);
  }

  createLocalExpense() {
    const { value, description, currency, method, tag, isEditing } = this.state;
    const { wallet } = this.props;
    const { currencies } = wallet;
    const exchangeRates = currencies[0];
    const { expenses } = wallet;
    let { id } = this.state;
    let expense = {};
    if (isEditing) {
      expense.id = expenses.find((expens) => expens.id === id).id;
      expense = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
    } else {
      id = expenses.length;
      expense = {
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates,
      };
    }
    this.setState({ expense });
  }

  enableEditExpenseMode({ target }) {
    let { id } = target;
    const { wallet } = this.props;
    const { expenses } = wallet;
    id = parseInt(id, 10);
    const expense = expenses.find((expens) => expens.id === id);
    this.setState({
      isEditing: true,
      id,
      expense,
      currency: expense.currency,
      value: expense.value,
      description: expense.description,
      tag: expense.tag,
      method: expense.method,
    });
  }

  renderHeader(totalExpenses, user) {
    return (
      <header>
        <h1>TrybeWallet</h1>
        <span data-testid="email-field">
          Email:
          { user.email }
        </span>
        <span data-testid="total-field">
          Total:
          { totalExpenses.toFixed(2) || 0}
        </span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }

  render() {
    const { isEditing, id } = this.state;
    const { user, wallet } = this.props;
    const totalExpenses = wallet.expenses !== undefined
      ? this.getTotalExpenseValue(wallet) : 0;
    return ((
      <section className="general">
        { this.renderHeader(totalExpenses, user) }
        {
          wallet.isFetching
            ? <div><h2 className="secondary-heading">Loading...</h2></div>
            : (
              <section className="data">
                {isEditing
                  ? (
                    <EditExpense
                      onChange={ this.handleInputEvents }
                      onClick={ this.saveExpense }
                      id={ id }
                    />)
                  : (
                    <AddExpense
                      onChange={ this.handleInputEvents }
                      saveExpense={ this.saveExpense }
                      state={ this.state }
                    />
                  )}
              </section>
            )
        }
        <ShowExpenses
          onClickDelete={ this.removeExpense }
          onClickEdit={ this.enableEditExpenseMode }
        />
      </section>)
    );
  }
}
Wallet.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  newExpenseDispatch: PropTypes.func.isRequired,
  deleteExpenseDispatch: PropTypes.func.isRequired,
  editExpenseDispatch: PropTypes.func.isRequired,
  getCurrencies: PropTypes.func.isRequired,
  wallet: PropTypes.shape().isRequired,
};
const mapStateToProps = (state) => ({
  user: state.user,
  wallet: state.wallet,
});
const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  newExpenseDispatch: (expense) => dispatch(createExpense(expense)),
  deleteExpenseDispatch: (index) => dispatch(deleteExpense(index)),
  editExpenseDispatch: (expense, index) => dispatch(updateExpense(expense, index)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
