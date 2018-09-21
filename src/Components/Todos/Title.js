import React, { Component } from 'react';

class Title extends Component {
    render() {
        return(<h1>TodoList({this.props.todos.length})</h1>);
    }
}
export default Title;