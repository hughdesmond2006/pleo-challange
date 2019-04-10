import React, { Component } from "react";

import "./ExpenseList.scss";
import ExpenseCard from "../../Templates/ExpenseCard/ExpenseCard";

function searchingFor(term) {
  return function(expense) {
    term = term.toLowerCase();

    return (
      expense.id.toLowerCase().includes(term) ||
      expense.amount.value.toLowerCase().includes(term) ||
      expense.merchant.toLowerCase().includes(term) ||
      expense.category.toLowerCase().includes(term) ||
      expense.comment.toLowerCase().includes(term) ||
      new Date(expense.date).toLocaleDateString().includes(term) ||
      expense.user.first.toLowerCase().includes(term) ||
      expense.user.last.toLowerCase().includes(term) ||
      expense.user.email.toLowerCase().includes(term) ||
      !term
    );
  };
}

class ExpenseList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expenses: props.expenses,
      term: "",
      selectedFile: null
    };

    this.searchHandler = this.searchHandler.bind(this);
  }

  searchHandler = (event) => {
    this.setState({ term: event.target.value });
  };

  render() {
    const { expenses, term } = this.state;

    return (
      <React.Fragment>
        <form>
          <input type={"text"} onChange={this.searchHandler} value={term} />
        </form>
        <ul className={"expense-list"}>
          {expenses.filter(searchingFor(term)).map(expense => {
            return (
              <li key={expense.id}>
                <ExpenseCard expenseData={expense}/>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default ExpenseList;
