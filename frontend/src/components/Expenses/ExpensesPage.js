import React, { Component } from "react";

import Spinner from "../Spinner/Spinner";
import ExpenseList from "./ExpenseList/ExpenseList";

class ExpensesPage extends Component {
  state = {
    isLoading: false,
    expenses: []
  };

  componentDidMount() {
    this.fetchExpenses();
  }

  fetchExpenses = () => {
    this.setState({ isLoading: true });

    //sends http req to browser
    fetch("http://localhost:3000/expenses", {
      method: "GET"
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed to receive expense data");
        }
        return res.json();
      })
      .then(resData => {
        console.dir(resData);

        const expenses = resData.expenses;
        this.setState({ expenses: expenses, isLoading: false });
      })
      .catch(err => {
        console.dir(err);

        this.setState({ isLoading: false });
      });
  };

  render() {
    return !this.state.isLoading ? <ExpenseList expenses={this.state.expenses}/> : <Spinner />;
  }
}

export default ExpensesPage;
