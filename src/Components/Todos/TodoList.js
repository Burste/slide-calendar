import React, { Component } from 'react';
import Todo from './Todo';

class TodoList extends Component {

    render() {
        const { todos } = this.props;
        return (
            <div>
                {todos.map((todo, index) => {
                    return <Todo key={index} todo={todo} i={index+1} />;
                })}
            </div>
        )
    }
}
export default TodoList;