import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';
import { RiDeleteBin2Fill, RiEdit2Fill } from 'react-icons/ri';
import { deleteExpense, editExpense } from '../../actions';
import './expanseTable.css';

class ExpanseTable extends Component {
  renderButton(i, totalExpense) {
    const { deliteItem, editItem } = this.props;
    return (
      <td>
        <button
          type="button"
          data-testid="edit-btn"
          className="btn btn-warning"
          onClick={ () => editItem(i) }
        >
          <RiEdit2Fill />
        </button>
        <button
          type="button"
          data-testid="delete-btn"
          className="btn btn-danger"
          onClick={ () => deliteItem(i, totalExpense) }
        >
          <RiDeleteBin2Fill />
        </button>
      </td>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <table className="table-container">
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
        {
          expenses.map((expense, i) => {
            // const exchangeArray = Object.values(expense.exchangeRates);
            // const coin = exchangeArray.find((obj) => obj.code === expense.currency);
            const { name, ask } = expense.exchangeRates[expense.currency];
            const totalExpense = parseFloat(expense.value * ask);
            return (
              <tr key={ i }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{expense.value}</td>
                <td>{name}</td>
                <td>{parseFloat(ask).toFixed(2)}</td>
                <td>{parseFloat(expense.value * ask).toFixed(2)}</td>
                <td>Real</td>
                { this.renderButton(i, totalExpense) }
              </tr>
            );
          })
        }
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  deliteItem: (index, expense) => dispatch(deleteExpense(index, expense)),
  editItem: (index) => dispatch(editExpense(index)),
});

ExpanseTable.propTypes = {
  deliteItem: func.isRequired,
  editItem: func.isRequired,
  expenses: func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ExpanseTable);
