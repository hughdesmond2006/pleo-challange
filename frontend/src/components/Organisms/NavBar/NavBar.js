import React, { Component } from "react";

import styles from "./NavBar.module.scss";
import store from "../../../redux/store";
import {
  changeFilterField,
  changeFilterText,
  toggleReceiptsOnly
} from "../../../redux/actions/filterActions";
import { applySort } from "../../../redux/actions/sortActions";
import SortButton from "../../Atoms/Button/SortButton";
import { highlightField } from "../../../redux/actions/highlightActions";
import CheckBox from "../../Atoms/Checkbox/CheckBox";

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeFilterField: "all",
      hasReceiptsOnly: false,
      activeSortField: "date",
      isAscending: false
    };
  }

  changeFilterText = event => {
    const { activeFilterField } = this.state;

    store.dispatch(changeFilterText(event.target.value));

    store.dispatch(highlightField(activeFilterField));
    setTimeout(function() {
      store.dispatch(highlightField('none'));
    }, 300);
  };

  changeFilterField = event => {
    this.setState({ activeFilterField: event.target.value });

    store.dispatch(changeFilterField(event.target.value));

    store.dispatch(highlightField(event.target.value));
    setTimeout(function() {
      store.dispatch(highlightField('none'));
    }, 300);
  };

  sort = sortField => {
    const { activeSortField, isAscending } = this.state;

    // sort direction only changes if a sort button is already active
    if(sortField !== activeSortField) {
      this.setState({ activeSortField: sortField });
      store.dispatch(applySort(sortField, isAscending));
    } else {
      this.setState({ isAscending: !isAscending });
      store.dispatch(applySort(sortField, !isAscending));
    }

    store.dispatch(highlightField(sortField));
    setTimeout(function() {
      store.dispatch(highlightField('none'));
    }, 300);
  };

  toggleReceiptsOnly = () => {
    const { hasReceiptsOnly } = this.state;

    this.setState({ hasReceiptsOnly: !hasReceiptsOnly });
    store.dispatch(toggleReceiptsOnly());
  };

  render() {
    const { activeSortField, isAscending, hasReceiptsOnly } = this.state;

    return (
      <>
        <div className={styles.bar}>
          <div className={styles.controls}>
            <div className={styles.filterArea}>
              <div className={styles.searchWrap}>
                <input
                  className={styles.search}
                  type={"text"}
                  placeholder={"Search"}
                  onChange={this.changeFilterText} />

                <select
                  className={styles.filterType}
                  onChange={this.changeFilterField}
                >
                  <option value="all">All</option>
                  <option value="date">Date</option>
                  <option value="amount">Amount</option>
                  <option value="id">ID</option>
                  <option value="user">User</option>
                  <option value="merchant">Merchant</option>
                  <option value="comment">Comment</option>
                </select>
                <i className={"material-icons " + styles.filterArrow}>arrow_drop_down</i>
              </div>
              <CheckBox label={"Has receipts"} checked={hasReceiptsOnly} onClick={this.toggleReceiptsOnly}/>
            </div>
            <div className={styles.sortArea}>
              <SortButton
                title="Amount"
                active={activeSortField === "amount"}
                isAscending={isAscending}
                onClick={() => this.sort("amount")}
              />
              <SortButton
                title="Date"
                active={activeSortField === "date"}
                isAscending={isAscending}
                onClick={() => this.sort("date")}
              />
            </div>
          </div>
        </div>
        <div className={styles.spacer} />
      </>
    );
  }
}

export default NavBar;
