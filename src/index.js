import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose } from "redux";
import { Provider } from "react-redux";
import App from "./components/App";
import reducer from "./reducer";

const stringEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  const dispatch = store.dispatch;
  store.dispatch = action => {
    if (typeof action === "string") {
      return dispatch({
        type: action
      });
    }
    return dispatch(action);
  };
  return store;
};
const logEnhancer = createStore => (...args) => {
  const store = createStore(...args);
  const dispatch = store.dispatch;
  store.dispatch = action => {
    console.log(action.type);
    return dispatch(action);
  };
  return store;
};

const store = createStore(reducer, compose(stringEnhancer, logEnhancer));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
