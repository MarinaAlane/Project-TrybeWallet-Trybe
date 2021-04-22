import React from 'react';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseTable from '../components/ExpenseTable/ExpenseTable';
import Header from '../components/Header';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <h1>TrybeWallet</h1>
        <ExpenseForm />
        <ExpenseTable />
      </div>
    );
  }
}

export default Wallet;
