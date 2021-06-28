import React from "react";

import "./App.css";
import HooksTest from "./components/HooksTest";
// import Button from "antd/lib/button";
import HocTest from "./components/HocTest";
import FormTest from "./components/FormTest";
import KFormTest from "./components/KFormTest";
import Dialog from "./components/Dialog";
import Tree from "./components/Tree";
import ReduxTest from "./components/ReduxTest";
import ReactRedux from "./components/ReactRedux";
import MyReduxTest from "./components/MyReduxTest";
import RouterTest from "./components/RouterTest";
import UseMemo from "./components/UseMemo";
import childComponentMethod from "./components/childComponentMethod";
import InitScroll from "./components/InitScroll";

import selectedModel from "./mobx/index.js";

// import { Router } from "react-router-dom";
// import { browserHistory } from 'react-router'

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const store = new selectedModel();

const routeConfig = [
  {
    path: "/",
    component: App,
    childRoutes: [
      { path: "about", component: Dialog },
      {
        path: "inbox",
        component: FormTest,
        childRoutes: [
          { path: "HocTest", component: HocTest },
          {
            path: "KFormTest",
            onEnter: function (nextState, replaceState) {
              replaceState(null, "KFormTest");
            },
          },
        ],
      },
      { path: "MyReduxTest", component: MyReduxTest },
      { path: "ReactRedux", component: ReactRedux },
      { path: "ReduxTest", component: ReduxTest },
      { path: "RouterTest", component: RouterTest },
      { path: "HooksTest", component: HooksTest },
      { path: "KFormTest", component: KFormTest },
      // { path: "Tree", component: Tree },
      { path: "UseMemo", component: UseMemo },
      {
        path: "childComponentparameters",component: childComponentMethod
      },
      {
        path: "InitScroll",component: InitScroll
      }
    ],
  },
];
function App() {
  const childRoutes = routeConfig[0].childRoutes;
  return (
    <div className="App">
      {/* <HooksTest/> */}
      {/* <HocTest/> */}
      {/* <FormTest/> */}
      {/* <KFormTest/> */}
      {/* <Dialog>something</Dialog> */}
      {/* <div className="App"> <Button type="primary">Button</Button> </div> */}
      <Tree store={store}/>
      {/* <UseMemo/> */}
      <header>
        <h1>首页</h1>
      </header>
      <section>
        <Router>
          <ul>
            {childRoutes.map((routerPage) => (
              <li key={routerPage.path}>
                <Link to={"/" + routerPage.path}>{routerPage.path}</Link>
              </li>
            ))}
          </ul>
          <Switch>
            {childRoutes.map((routerPage) => (
              <Route
                key={routerPage.path}
                path={"/" + routerPage.path}
                component={routerPage.component}
              />
            ))}
          </Switch>
        </Router>
      </section>
      {/* <ReduxTest/> */}
      {/* <ReactRedux/> */}
      {/* <MyReduxTest/> */}
      {/* <RouterTest /> */}
    </div>
  );
}

export default App;
