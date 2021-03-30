import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.renderDeleteButton = this.renderDeleteButton.bind(this);
  }

  renderDeleteButton(id) {
    const { removeExpense } = this.props;
    return (
      <button
        type="button"
        data-testid="delete-btn"
        onClick={ () => removeExpense(id) }
      >
        X
      </button>
    );
  }

  render() {
    const { expenses } = this.props;
    return (
      <div>
        <table>
          <thead className="table-header">
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
            {
              expenses.map((expense) => {
                const { id, value, description } = expense;
                const { currency, method, tag, exchangeRates } = expense;
                const { name, ask } = exchangeRates[currency];
                return (
                  <tr key={ id }>
                    <td>{ description }</td>
                    <td>{ tag }</td>
                    <td>{ method }</td>
                    <td>{ value }</td>
                    <td>{ name }</td>
                    <td>{ parseFloat(ask).toFixed(2) }</td>
                    <td>{ (ask * parseInt(value, 10)).toFixed(2) }</td>
                    <td>Real</td>
                    <td>
                      { this.renderDeleteButton(id) }
                    </td>
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  removeExpense: (id) => dispatch(deleteExpense(id)),
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  removeExpense: PropTypes.func.isRequired,
};

Table.defaultProps = {
  expenses: [],
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
