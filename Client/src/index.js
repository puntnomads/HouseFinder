import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, createStore, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import { Router, Redirect } from "react-router";
import history from "./history";
import Main from "./components/Main";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

import IndexReducer from "./index-reducer";
import IndexSagas from "./index-sagas";

const sagaMiddleware = createSagaMiddleware();

const composeSetup =
  process.env.NODE_ENV !== "production" &&
  typeof window === "object" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const store = createStore(
  IndexReducer,
  composeSetup(applyMiddleware(sagaMiddleware)) // allows redux devtools to watch sagas
);

sagaMiddleware.run(IndexSagas);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <div style={{ width: "100%", height: "100%" }}>
        {window.location.pathname.includes("index.html") && <Redirect to="/" />}
        <Main />
      </div>
    </Router>
  </Provider>,
  document.getElementById("root")
);
