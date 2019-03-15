import React, { Component } from "react";
import axios from 'axios';

import Comment from "../../Atoms/Comment/Comment";
import "./ExpenseList.css";

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

  fileSelectedHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0]});
  };

  fileUploadHandler = (id) => {
    const formData = new FormData();
    formData.append('receipt', this.state.selectedFile, this.state.selectedFile.name);

    axios.post(`http://localhost:3000/expenses/${id}/receipts`, formData)
      .then(res => {
        console.log(res);
      });
  };

  render() {
    const { expenses, term } = this.state;
    return (
      <React.Fragment>
        <form>
          <input type={"text"} onChange={this.searchHandler} value={term} />
        </form>
        <ul className={"expense__list"}>
          {expenses.filter(searchingFor(term)).map(expense => {
            return (
              <li key={expense.id} className={"expense__item"}>
                <div className={"expense__item-data"}>
                  id: {expense.id}
                  <br />
                  amount: {expense.amount.currency} {expense.amount.value}
                  <br />
                  category: {expense.category}
                  <br />
                  comment: <Comment text={expense.comment} id={expense.id} />
                  <br />
                  date: {new Date(expense.date).toLocaleDateString()}
                  <br />
                  index: {expense.index}
                  <br />
                  merchant: {expense.merchant}
                  <br />
                  receipts: {expense.receipts.length}
                  <input type={"file"} onChange={this.fileSelectedHandler}/>
                  <button onClick={this.fileUploadHandler.bind(this, expense.id)}>Upload</button>
                  <br />
                  user: {expense.user.first} {expense.user.last}(
                  {expense.user.email})
                </div>
              </li>
            );
          })}
        </ul>
      </React.Fragment>
    );
  }
}

export default ExpenseList;
