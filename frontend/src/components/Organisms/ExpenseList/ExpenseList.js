import React, { Component } from "react";
import { connect } from "react-redux";

import "./ExpenseList.scss";
import ExpenseCard from "../../Templates/ExpenseCard/ExpenseCard";
import PropTypes from "prop-types";
import { expenseType } from "../../../types/propShapes";

class ExpenseList extends Component {
  constructor(props) {
    super(props);
  }

  filterFunction = (expense) => {
    const { filterText, filterField, hasReceiptsOnly } = this.props;

    const filterTextLowercase = filterText.toLowerCase();

    // if the 'has receipts' checkbox is checked then filter any expenses with an empty receipts array
    if(hasReceiptsOnly){
      console.log("HAI");
      if(expense.receipts.length === 0){
        return false;
      }
    }

    switch(filterField){
      case "all":
        return (
          expense.id.toLowerCase().includes(filterTextLowercase) ||
          expense.user.first.toLowerCase().includes(filterTextLowercase) ||
          expense.user.last.toLowerCase().includes(filterTextLowercase) ||
          expense.user.email.toLowerCase().includes(filterTextLowercase) ||
          expense.merchant.toLowerCase().includes(filterTextLowercase) ||
          expense.category.toLowerCase().includes(filterTextLowercase) ||
          expense.comment.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "id":
        return (
          expense.id.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "user":
        return (
          expense.user.first.toLowerCase().includes(filterTextLowercase) ||
          expense.user.last.toLowerCase().includes(filterTextLowercase) ||
          expense.user.email.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "merchant":
        return (
          expense.merchant.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "comment":
        return (
          expense.comment.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      default:
        throw new Error("Invalid filter field dispatched!: " + filterField);
    }
  };

  sortFunction = (expense1, expense2) => {
    const { sortField, isAscending } = this.props;

    // If sort direction was changed then reverse the order..
    if(isAscending) {
      const temp = expense1;
      expense1 = expense2;
      expense2 = temp;
    }

    switch(sortField){
      case "date":
        return new Date(expense1.date) > new Date(expense2.date) ? -1 : 1;
      case "amount":
        return parseFloat(expense1.amount.value) > parseFloat(expense2.amount.value) ? -1 : 1;
      default:
        throw new Error("Invalid sort field dispatched!: " + sortField);
    }
  };

  render() {
    const { expenses } = this.props;

    return (
      <React.Fragment>
        <ul className={"expense-list"}>
          {expenses
            .filter(this.filterFunction)
            .sort(this.sortFunction)
            .map(expense => {
              return (
                <li key={expense.index}>
                  <ExpenseCard expenseData={expense} />
                </li>
              );
            })}
        </ul>
      </React.Fragment>
    );
  }
}

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(expenseType).isRequired,
  filterText: PropTypes.string.isRequired,
  filterField: PropTypes.string.isRequired,
  hasReceiptsOnly: PropTypes.bool.isRequired,
  sortField: PropTypes.string.isRequired,
  isAscending: PropTypes.bool.isRequired
};

// these are the pieces of state which will be mapped to this component's props
const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    filterText: state.filter.filterText,
    filterField: state.filter.filterField,
    hasReceiptsOnly: state.filter.hasReceiptsOnly,
    sortField: state.sort.sortField,
    isAscending: state.sort.isAscending
  };
};

// connect redux store to this component & export
export default connect(mapStateToProps)(ExpenseList);