import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/"><Login /></Route>
        <Route path="/carteira"><Wallet /></Route>
      </Switch>
    </div>
  );
}

export default App;
