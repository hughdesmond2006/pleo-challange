import React, { Component } from 'react';
import './App.scss';
import ExpensesPage from "./components/Pages/ExpensesPage";
import Provider from "react-redux/es/components/Provider";
import store from "./redux/store";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ExpensesPage/>
      </Provider>
    );
  }
}

export default App;
