import React, { Component } from "react";

import getEditableElement from '../../HOC/getEditableElement'
import Comment from '../../Atoms/Comment/Comment'
import "./ExpenseList.css";

class ExpenseList extends Component {
  state = {
    editing: false
  };

  constructor(props) {
    super(props);

    this.expenses = props.expenses;
  }

  edit() {
    this.setState({ editing: true });
  }

  save() {
    this.setState({ editing: false });
  }

  renderComment(expense) {
    return this.state.editing ? (
      <React.Fragment>
        <textarea ref="newText" defaultValue={expense.comment} />
        <button onClick={this.save}>Save</button>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <div className="commentText">{expense.comment}</div>
        <button onClick={this.edit}>Edit</button>
      </React.Fragment>
    );
  }

  render() {

    let EditableTextArea = getEditableElement('textarea');

    return (
      <ul className={"expense__list"}>
        {this.expenses.map(expense => {
          return (
            <li key={expense.id} className={"expense__item"}>
              <div className={"expense__item-data"}>
                id: {expense.id}
                <br />
                amount: {expense.amount.currency} {expense.amount.value}
                <br />
                category: {expense.category}
                <br />
                comment: <Comment text={expense.comment + 'test'} id={expense.id}/>
                <br />
                date: {new Date(expense.date).toLocaleDateString()}
                <br />
                index: {expense.index}
                <br />
                merchant: {expense.merchant}
                <br />
                receipts: {expense.receipts.length}
                <br />
                user: {expense.user.first} {expense.user.last}({expense.user.email})
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

export default ExpenseList;
