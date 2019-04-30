import React, { Component } from "react";

import Spinner from "../../Atoms/Spinner/Spinner";
import ExpenseList from "../../Organisms/ExpenseList/ExpenseList";
import { connect } from "react-redux";

import styles from "./ExpensesPage.module.scss";
import NavBar from "../../Organisms/NavBar/NavBar";
import { fetchData} from "../../../redux/actions/expensesActions";

class ExpensesPage extends Component {
  state = {
    expenses: []
  };

  componentDidMount() {
    const { onFetchData } = this.props;
    onFetchData();
  }

  render() {
    const { isLoading, expenses } = this.props;

    console.log(this.props);

    return (
      <>
        <NavBar />
        {!isLoading ? (
          <ExpenseList expenses={expenses} />
        ) : (
          <Spinner />
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    expenses: state.expenses.expenses,
    error: state.expenses.error,
    isLoading: state.expenses.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return { onFetchData: () => dispatch(fetchData()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExpensesPage);
