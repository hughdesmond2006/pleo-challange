import React, { Component } from "react";

import Spinner from "../../Atoms/Spinner/Spinner";
import ExpenseList from "../../Organisms/ExpenseList/ExpenseList";
import axios from "axios";

import "./ExpensesPage.scss";
import NavBar from "../../Organisms/NavBar/NavBar";
import store from "../../../redux/store";
import {initExpenses} from "../../../redux/actions/expensesActions"

class ExpensesPage extends Component {
  state = {
    isLoading: false,
    expenses: []
  };

  componentDidMount() {
    this.fetchExpenses();
  }

  componentDidUpdate() {
    console.log("Page updated!");
  }

  fetchExpenses = () => {
    this.setState({ isLoading: true });

    //gets all expenses from the api
    axios
      .get("http://localhost:3000/expenses")
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("failed to receive expense data");
        }

        this.setState({ expenses: res.data.expenses, isLoading: false });

        store.dispatch(initExpenses(res.data.expenses));
      })
      .catch(err => {
        console.dir(err);

        this.setState({ isLoading: false });
      });
  };

  render() {
    const { isLoading } = this.state;

    return (
      <>
        <NavBar />
        {!isLoading ? (
          <ExpenseList expenses={this.state.expenses} />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

export default ExpensesPage;