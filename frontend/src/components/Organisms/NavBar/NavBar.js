import React, { Component } from "react";

import "./NavBar.scss";
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
        <div className={"navbar"}>
          <div className="navbar__controls">
            <div className="controls__filter-area">
              <div className={"controls__search-wrap"}>
                <input
                  className={"controls__search"}
                  type={"text"}
                  placeholder={"Search"}
                  onChange={this.changeFilterText} />

                <select
                  className={"controls__filter-type"}
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
                <i className="material-icons filter__arrow">arrow_drop_down</i>
              </div>
              <CheckBox label={"Has receipts"} checked={hasReceiptsOnly} onClick={this.toggleReceiptsOnly}/>
            </div>
            <div className="controls__sort-area">
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
        <div className={"navbar__spacer"} />
      </>
    );
  }
}

export default NavBar;
