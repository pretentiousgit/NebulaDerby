import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise";
import { createLogger } from "redux-logger";
import app from "./reducers/app";

const logger = createLogger();

const middleware = applyMiddleware(thunk, promise, logger);

const reducer = combineReducers({
  app
});

export default createStore(reducer, middleware);
