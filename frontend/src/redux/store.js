import {applyMiddleware, combineReducers, createStore} from "redux";
import logger from "redux-logger";

import filterReducer from "./reducers/filterReducer";
import sortReducer from "./reducers/sortReducer";

export default createStore(
  combineReducers({
    filter: filterReducer,
    sort: sortReducer
  }),
  applyMiddleware(logger)
);
