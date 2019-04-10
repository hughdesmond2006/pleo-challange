import React, { Component } from "react";

import Spinner from "../Atoms/Spinner/Spinner";
import ExpenseList from "./ExpenseList/ExpenseList";
import axios from "axios";

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

    //gets all expenses from the api
    axios.get("http://localhost:3000/expenses")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed to receive expense data");
        }

        this.setState({ expenses: res.data.expenses, isLoading: false });
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