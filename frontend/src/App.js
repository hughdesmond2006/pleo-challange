import React, { Component } from 'react';
import logo from './logo.svg';
import './App.scss';
import ExpensesPage from "./components/Pages/ExpensesPage";

class App extends Component {
  render() {
    return (
      <ExpensesPage/>
    );
  }
}

export default App;
