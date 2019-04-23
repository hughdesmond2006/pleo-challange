import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";

import filterReducer from "./reducers/filterReducer";
import sortReducer from "./reducers/sortReducer";
import expensesReducer from "./reducers/expensesReducer";

export default createStore(
  combineReducers({
    filter: filterReducer,
    sort: sortReducer,
    expenses: expensesReducer
  }),
  applyMiddleware(logger)
);
