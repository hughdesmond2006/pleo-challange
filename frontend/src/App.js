import React, { Component } from 'react';
import ExpensesPage from "./components/Pages/ExpensesPage/ExpensesPage";
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
