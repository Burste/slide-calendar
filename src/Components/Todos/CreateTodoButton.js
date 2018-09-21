import React, { Component } from 'react';
class CreateTodoButton extends Component {
    render() {
        return (
            <div className="control">
                <button onClick={this.props.createTodo}>新增</button>
            </div>
        )
    }
}
export default CreateTodoButton;    