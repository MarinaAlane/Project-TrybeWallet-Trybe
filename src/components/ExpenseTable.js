import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ExpenseTable.css';
import TableContent from './TableContent';
import { removeExpenseData } from '../actions';

class ExpenseTable extends React.Component {
  constructor(props) {
    super(props);
    this.handleClickDeleteBtn = this.handleClickDeleteBtn.bind(this);
  }

  handleClickDeleteBtn(id) {
    const { expenses, removeExpense } = this.props;
    const updatedCurrencies = expenses.filter((expense) => expense.id !== id);
    removeExpense(updatedCurrencies);
  }

  render() {
    const { expenses } = this.props;
    const tableLine = expenses.map((expense) => (
      <TableContent
        key={ expense.currency }
        expense={ expense }
        onclick={ this.handleClickDeleteBtn }
      />
    ));
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {tableLine}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (updatedCurrencies) => dispatch(removeExpenseData(updatedCurrencies)),
});

ExpenseTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeExpense: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTable);
