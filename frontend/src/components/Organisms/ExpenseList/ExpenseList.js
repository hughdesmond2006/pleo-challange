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

    const filterTextLowercase = filterText.toLowerCase().trim();

    // if the 'has receipts' checkbox is checked then filter any expenses with an empty receipts array
    if(hasReceiptsOnly){
      if(expense.receipts.length === 0){
        return false;
      }
    }

    //fields that need formatting for the purpose of searching..
    const fullName = expense.user.first + ' ' + expense.user.last;

    const prettyAmount = new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: expense.amount.currency,
      useGrouping: true
    }).format(expense.amount.value);

    const prettyDate = new Date(expense.date).toLocaleDateString("en-GB");

    switch(filterField){
      case "all":
        return (
          expense.id.toLowerCase().includes(filterTextLowercase) ||
          prettyDate.includes(filterTextLowercase) ||
          expense.amount.value.toLowerCase().includes(filterTextLowercase) ||
          prettyAmount.toLowerCase().includes(filterTextLowercase) ||
          fullName.toLowerCase().includes(filterTextLowercase) ||
          expense.user.email.toLowerCase().includes(filterTextLowercase) ||
          expense.merchant.toLowerCase().includes(filterTextLowercase) ||
          expense.category.toLowerCase().includes(filterTextLowercase) ||
          expense.comment.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "date":
        return (
          prettyDate.includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "amount":
        return (
          expense.amount.value.toLowerCase().includes(filterTextLowercase) ||
          prettyAmount.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "id":
        return (
          expense.id.toLowerCase().includes(filterTextLowercase) ||
          !filterTextLowercase
        );
      case "user":
        return (
          fullName.toLowerCase().includes(filterTextLowercase) ||
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
    const { expenses, highlightedField } = this.props;

    return (
      <React.Fragment>
        <ul className={"expense-list"}>
          {expenses
            .filter(this.filterFunction)
            .sort(this.sortFunction)
            .map(expense => {
              return (
                <li key={expense.index}>
                  <ExpenseCard expenseData={expense} highlightedField={highlightedField}/>
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
  isAscending: PropTypes.bool.isRequired,
  highlightedField: PropTypes.string
};

// these are the pieces of state which will be mapped to this component's props
const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    filterText: state.filter.filterText,
    filterField: state.filter.filterField,
    hasReceiptsOnly: state.filter.hasReceiptsOnly,
    sortField: state.sort.sortField,
    isAscending: state.sort.isAscending,
    highlightedField: state.highlight.highlightedField
  };
};

// connect redux store to this component & export
export default connect(mapStateToProps)(ExpenseList);