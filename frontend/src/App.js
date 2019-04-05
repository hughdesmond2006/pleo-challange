import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import ExpensesPage from "./components/Expenses/ExpensesPage";

class App extends Component {
  render() {
    return (
      <ExpensesPage/>
    );
  }
}

export default App;
