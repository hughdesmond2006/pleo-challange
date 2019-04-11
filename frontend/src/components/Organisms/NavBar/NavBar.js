import React, { Component } from "react";

import "./NavBar.scss";
import store from '../../../redux/store'

class NavBar extends Component {
  sortDate = () => {
    store.dispatch({
      type: "SORT_FIELD",
      payload: "date"
    });
    store.dispatch({
      type: "TOGGLE_SORT_DIRECTION"
    });
  };

  sortAmount = () => {
    store.dispatch({
      type: "SORT_FIELD",
      payload: "amount"
    });
    store.dispatch({
      type: "TOGGLE_SORT_DIRECTION"
    });
  };

  toggleReceiptsOnly = () => {
    store.dispatch({
      type: "TOGGLE_RECEIPTS_ONLY"
    });
  };

  render() {
    return (
      <>
        <div className={"navbar"}>
          <div className="navbar__controls">
            <div className="controls__filter-area">
              <input
                className={"controls__search"}
                type={"text"}
                onChange={null}
              />
              <select className={"controls__filter-type"}>
                <option value="all">All</option>
                <option value="ID">ID</option>
                <option value="user">User</option>
                <option value="merchant">Merchant</option>
                <option value="comment">Comment</option>
              </select>
              <input className={"controls__receipts-only"} type={"checkbox"} onClick={this.toggleReceiptsOnly}/>
              <p className={"receipts-only__label"}>Has Receipts?</p>
            </div>
            <div className="controls__sort-area">
              <button className="btn controls__sort-amount" onClick={this.sortAmount}>Amount ^</button>
              <button className="btn controls__sort-date" onClick={this.sortDate}>Date ^</button>
            </div>
          </div>
        </div>
        <div className={"navbar__spacer"} />
      </>
    );
  }
}

export default NavBar;
