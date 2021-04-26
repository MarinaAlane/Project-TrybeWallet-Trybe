import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login/index';
import Wallet from './pages/Wallet/index';
import './App.css';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" component={ Login } />
      </Switch>
    );
  }
}

export default App;
