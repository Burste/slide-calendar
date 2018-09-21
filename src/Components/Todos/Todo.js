import React, { Component } from "react";

class Todo extends Component {
  render() {
    return (
      <li className="left pd-h-5">
        <span className="pd-r-5">{this.props.i}.</span>
        {this.props.todo.text}
      </li>
    );
  }
}
export default Todo;
