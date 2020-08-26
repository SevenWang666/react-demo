import React, { Component } from "react";
import { createStore, applyMidderware } from "../store/kredux";
import { counterReducer, asyncAdd } from "../store/counter.js";

const store = createStore(counterReducer, applyMidderware(logger,logger2,logger3, thunk));

function logger({ dispatch, store }) {
  return dispatch => action => {
    console.log(action.type + "任务执行");
    return dispatch(action);
  };
}
function logger2({ dispatch, store }) {
  return dispatch => action => {
    console.log(action.type + "任务执行2");
    return dispatch(action);
  };
}
function logger3({ dispatch, store }) {
  return dispatch => action => {
    console.log(action.type + "任务执行2");
    return dispatch(action);
  };
}
function dispatch(action){
  return action
}

function thunk({ dispatch, getState }) {
  return dispatch => action => {
    if (typeof action == "function") {
      return action(dispatch, getState);
    }
    console.log(action.type +'异步执行')
    return dispatch(action);
  };
}

export default class MyReduxTest extends Component {
  componentDidMount() {
    store.subscribe(() => {
      this.forceUpdate();
    });
  }
  render() {
    return (
      <div>
        {store.getStore()}
        <button
          onClick={() => {
            store.dispatch({ type: "add" });
          }}
        >
          加一
        </button>
        <button
          onClick={() => {
            asyncAdd()(store.dispatch);
          }}
        >
          异步加五
        </button>
      </div>
    );
  }
}
