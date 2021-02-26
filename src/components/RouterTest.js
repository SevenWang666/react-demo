import React, { Component } from "react";
import { connect } from "react-redux";
import { login, loginout } from "../store/counter.js";
import { loginSaga } from "../saga/user.js";

import { observer } from "mobx-react";

import {
  BrowserRouter,
  Route,
  Link,
  Switch,
  Redirect,
  Router,
} from "react-router-dom";


// function ProductList() {
//   return (
//     <div>
//       <h3>商品列表</h3>
//       <Link to="/detail/web">web全栈</Link>
//     </div>
//   );
// }
@observer 
class ProductList extends Component {
  onReset() {
    this.props.appState.resetTimer();
  }
  render() {
    return (
      <div>
        <h3>商品列表</h3>
        <Link to="/detail/web">web全栈</Link>
        <button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
        </button>
      </div>
    );
  }
}
@connect(
  (state) => ({
    isLogin: state.user.isLogin,
  }),
  { loginout }
)
class PraviteLogin extends Component {
  constructor(props) {
    super(props);
    console.log(props);
  }
  render() {
    let { component: Component, path, isLogin, ...args } = this.props;
    return (
      <div >
        <button onClick={this.props.loginout}>注销</button>
        <Route
          {...args}
          render={(props) =>
            isLogin ? (
              <Component />
            ) : (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { redirect: props.location.pathname },
                }}
              />
            )
          }
        ></Route>
      </div>
    );
  }
}
function Detail({ match, history, location }) {
  return (
    <div>
      <h3>详情</h3>
      <div>
        <button onClick={history.goBack}>后退</button>
      </div>
    </div>
  );
}
@connect(
  (state) => ({
    isLogin: state.user.isLogin,
  }),
  { login, loginout, loginSaga }
)
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handClick = () => {
    let { history } = this.props;
    console.log(this.state.name);
    this.props.loginSaga(this.state.name);
    // history.push('/management')
  };
  render() {
    return (
      <div>
        <div>
          {this.props.isLogin ? (
            <Route>
              {" "}
              <Redirect to="/management/book" />
            </Route>
          ) : (
            "请先登录"
          )}
        </div>
        {/* <div >{this.props.isLogin?'已登录':'请先登录'}</div> */}
        <input
          type="text"
          onChange={(e) => {
            this.setState({ name: e.target.value });
          }}
          placeholder="请输入"
        />
        <button onClick={this.handClick}>登录</button>
      </div>
    );
  }
}
//路由守卫，通过高阶组件包装Route得到一个PrivateRoute
//为其扩展一个用户状检查功能

function ProductMgt() {
  return (
    <div>
      <h3>商品管理</h3>
      <Link to="/management/book">书籍</Link>
      <Link to="/management/food">食物</Link>
      <Route
        path="/management/book"
        component={() => {
          return <div>book</div>;
        }}
      />
      <Route
        path="/management/food"
        component={() => {
          return <div>food</div>;
        }}
      />
      <Redirect to="/management/book" />
    </div>
  );
}

export default class RouterTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
    console.log("初始化");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("更新state");
    return state;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("快照");
    return null;
  }
  // componentWillUnmount(){
  //   console.log('挂载前')
  // }
  componentDidMount() {
    console.log("挂载后");
  }
  // componentWillUpdate(){
  //   console.log('更新前')
  // }
  componentDidUpdate() {
    console.log("更新后");
  }
  // componentWillReceiveProps(){
  //   console.log('属性更新前')
  // }
  componentWillUnmount() {
    console.log("销毁");
  }
  shouldComponentUpdate() {
    console.log("是否渲染");
    return true;
  }
  render() {
    console.log("渲染");
    return (
      <BrowserRouter>
        <nav>
          <Link to="/">商品列表</Link>
          <Link to="/management">商品管理</Link>
          <Link to="/login">登录</Link>
        </nav>
        {/* 路由配置 */}
        <Switch>
          <Route exact path="/" component={ProductList} />
          {/* <Route path="/management" component={ProductMgt} /> */}
          <Route path="/login" component={Login} />
          <Route path="/detail/:name" component={Detail} />
          <PraviteLogin path="/management" component={ProductMgt} />
          <Route component={() => <div>页面不存在</div>} />
        </Switch>
        <button
          onClick={() => {
            this.setState({ count: this.state.count + 1 });
          }}
        >
          加一
        </button>
        <p>{this.state.count}</p>
        {/* 精确匹配 */}
        {/* <Route exact path="/" component={ProductList} />
        <Route path="/management" component={ProductMgt} />
        <Route path="/detail/:name" component={Detail} /> */}
      </BrowserRouter>
    );
  }
}
