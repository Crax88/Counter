import React from "react";
import ReactDOM from "react-dom";
import { createStore, compose, applyMiddleware } from "redux";
import thunkMiddleWare from "redux-thunk";
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
const logMiddleware = store => dispatch => action => {
  console.log(action.type, store.getState());
  return dispatch(action);
};
const stringMiddleware = () => dispatch => action => {
  if (typeof action === "string") {
    return dispatch({
      type: action
    });
  }
  return dispatch(action);
};
const myAction = dispatch => {
  setTimeout(() => {
    dispatch({ type: "DELAYED_ACTION" });
  }, 1000);
};
const delayedActionCreator = timeout => dispatch => {
  setTimeout(() => {
    dispatch({ type: "DELAYED_ACTION" });
  }, timeout);
};
// const store = createStore(reducer, compose(stringEnhancer, logEnhancer));
const store = createStore(
  reducer,
  applyMiddleware(thunkMiddleWare, stringMiddleware, logMiddleware)
);
store.dispatch(delayedActionCreator(3000));
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
