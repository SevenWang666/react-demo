import React, { Component, useState, useEffect } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import Store, { appState } from "../mobx/index.js";

const store = new Store();

@observer
class TimerView extends React.Component {
  @observable secondsPassed = 0;
  componentWillMount() {
    setInterval(() => {
      this.secondsPassed++;
    }, 1000);
  }
  @action
  init=()=>{
    this.secondsPassed=0
  }
  render() {
    return (
      <>
        <button onClick={this.onReset}>
          Seconds passed: {this.props.appState.timer}
        </button>
        <span>Seconds passed: {this.secondsPassed} </span>
        <button onClick={this.init}>init</button>
      </>
    );
  }

  onReset = () => {
    this.props.appState.resetTimer();
  };
}
@observer
class PureComNode extends Component {
  constructor(props) {
    console.log("渲染");
    super(props);
    this.state = {};
  }
  handClick = () => {
    store.setSelected("test");
    // appState
  };

  render() {
    return (
      <div>
        {store.getSelected}
        <button onClick={this.handClick}>点击修改mobx</button>
      </div>
    );
  }
}
@observer
class TreeNode extends Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }
  get isFolder() {
    return this.props.data.children && this.props.data.children.length > 0;
  }
  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    return (
      <div>
        <ul>
          <li>
            <div onClick={this.toggle}>
              {this.props.data.title} {this.props.newTodoTitle}
              {this.isFolder ? <span>{this.state.open ? "-" : "+"}</span> : ""}
            </div>
            {this.isFolder ? (
              <div style={{ display: this.state.open ? "block" : "none" }}>
                {this.props.data.children.map((child) => (
                  <TreeNode data={child} key={child.title}></TreeNode>
                ))}
              </div>
            ) : null}
          </li>
        </ul>
      </div>
    );
  }
}
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(friendID);

  function handleStatusChange(status) {
    setIsOnline(status.isOnline);
  }

  useEffect(() => {
    console.log("订阅");
    return () => {
      console.log("取消订阅");
    };
  });

  return isOnline;
}
function FriendStatus(props) {
  const isOnline = useFriendStatus(1);

  if (isOnline === null) {
    return "Loading...";
  }
  return isOnline ? "Online" : "Offline";
}
@observer
class Tree extends Component {
  @observable newTodoTitle = "标题";
  @observable secondsPassed = 0;
  constructor(props) {
    super(props);
    this.data = {
      title: "水果",
      children: [
        {
          title: "香蕉",
          children: [
            {
              title: "香蕉子",
            },
          ],
        },
        {
          title: "苹果",
          children: [
            {
              title: "苹果籽",
            },
          ],
        },
        {
          title: "西瓜",
        },
        {
          title: "琉璃",
          children: [
            {
              title: "琉璃灯",
            },
          ],
        },
      ],
    };
  }

  render() {
    return (
      <div>
        <div>
          <h1>ceshi</h1>
          <div dangerouslySetInnerHTML={{ __html: "<span>abc<span>" }} />
          {/* 相当于在div.innerHTML=__html 之所以用用这种方式是为了防止xss攻击(跨站脚本攻击)*/}
          <div
            onClickCapture={(e) => {
              console.log("测试捕获");
              console.log(e.nativeEvent);
            }}
          >
            {/* nativeEvent原生事件对象 ,e为合成事件对象*/}
            <div
              onClickCapture={(e) => {
                console.log("冒泡");
                console.log(e.nativeEvent);
              }}
            >
              点击
            </div>
          </div>
          <span>Seconds passed: {this.secondsPassed} </span>
          <FriendStatus />
        </div>
        <TreeNode data={this.data} newTodoTitle={this.newTodoTitle} />
        <PureComNode />
        <TimerView appState={appState} />
      </div>
    );
  }
}
export default Tree;
