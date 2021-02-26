import React, { useState, useEffect, useReducer, useContext,useCallback } from "react";
import hooks from "./hooks.module.css";

const Context = React.createContext();

function FruitList(props) {
  console.log("子组件");
  return (
    <ul>
      {props.fruits.map(fruit => (
        <li
          key={fruit}
          onClick={() => {
            props.onSetFruit(fruit);
          }}
        >
          {fruit}
        </li>
      ))}
    </ul>
  );
}
function fruitReducer(state, action) {
  switch (action.type) {
    case "init":
      return action.payload;
    case "add":
      return [...state, action.payload];
    default:
      return state;
  }
}
function FruitAdd({ onSetFruits }) {
  const { dispatch } = useContext(Context);
  const onAddFruit = e => {
    if (e.key === "Enter") {
      //  onSetFruits(e.target.value)
      dispatch({ type: "add", payload: e.target.value });
    }
  };
  return (
    <div>
      请添加水果:
      <input type="text" className={hooks.inputText} onKeyDown={onAddFruit} />
    </div>
  );
}
export default function HooksTest() {
  const [fruit, setFruit] = useState("");
  // const [fruits, setFruits] = useState([]);
  const [fruits, dispatch] = useReducer(fruitReducer, []);
  console.log("父组件");
  useEffect(() => {
    console.log("effect");
    let timeoutId = setTimeout(() => {
      //setFruits(["苹果", "香蕉", "芒果"])
      dispatch({ type: "init", payload: ["苹果", "香蕉", "芒果"] });
    }, 1000);
    return () => {
      console.log("返回的值");
      clearInterval(timeoutId);
    };
  }, [fruit]);
  useEffect(() => {
    document.title = fruit;
  }, [fruit]);
  function doSomething(){
    console.log('测试callback')
  }
  const memoizedCallback = useCallback(
  () => {
    doSomething();
  },
  [],
);
  return (
    <Context.Provider value={{fruits,dispatch}}>
      <div>
        <FruitAdd
          onSetFruits={name => {
            dispatch({ type: "add", payload: name });
          }}
        ></FruitAdd>
        <div>{fruit}</div>
        <FruitList fruits={fruits} onSetFruit={setFruit}></FruitList>
      </div>
    </Context.Provider>
  );
}
