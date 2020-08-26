import React from "react";
import logo from "./logo.svg";
import "./App.css";
import HooksTest from "./components/HooksTest";
import Button from "antd/lib/button";
import HocTest from "./components/HocTest";
import FormTest from "./components/FormTest";
import KFormTest from "./components/KFormTest";
import Dialog from "./components/Dialog";
import Tree from "./components/Tree";
import ReduxTest from "./components/ReduxTest";
import ReactRedux from "./components/ReactRedux";
import MyReduxTest from "./components/MyReduxTest";
import RouterTest from "./components/RouterTest";

function App() {
  return (
    <div className="App">
      {/* <HooksTest/> */}
      {/* <HocTest/> */}
      {/* <FormTest/> */}
      {/* <KFormTest/> */}
      {/* <Dialog>something</Dialog> */}
      {/* <div className="App"> <Button type="primary">Button</Button> </div> */}
      {/* <Tree/> */}
      {/* <ReduxTest/> */}
      {/* <ReactRedux/> */}
      {/* <MyReduxTest/> */}
      <RouterTest />
    </div>
  );
}

export default App;
