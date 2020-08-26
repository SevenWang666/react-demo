import React, { Component } from "react";
import { connect } from "react-redux";
import {add,minus,asyncAdd} from "../store/counter.js"


@connect(state => ({ number: state.counter }), {
    add,minus,asyncAdd
})
class ReactRedux extends Component {
  render() {
    return (
      <div>
        {this.props.number}
        <button
          onClick={() => {
            this.props.add(1);
          }}
        >
          加一{" "}
        </button>
        <button
          onClick={() => {
            this.props.add(2);
          }}
        >
          加二{" "}
        </button>
        <button onClick={this.props.minus}>减一 </button>
        <button onClick={this.props.asyncAdd}>异步加五 </button>
      </div>
    );
  }
}
export default ReactRedux;
