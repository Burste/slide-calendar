import React, { Component } from "react";
import Title from './Title';
import CreateTodo from './CreateTodo';
import TodoList from './TodoList';
class GroupTabContent extends Component {

  createTodo(newtodo){
      this.props.createTodo&&
      this.props.createTodo(newtodo,this.props.groupid)
  }
  render() {
    const {todos}=this.props;
    return (
      <div>
        <Title todos={todos} />
        <CreateTodo
          createTodo={newtodo => this.createTodo(newtodo)}
        />
        <TodoList todos={this.props.todos} />
      </div>
    );
  }
}

export default GroupTabContent;
