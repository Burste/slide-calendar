import React, { Component } from 'react';
import TodoLabel from './TodoLabel';
import TodoInput from './TodoInput';
import CreateTodoButton from './CreateTodoButton';
class CreateTodo extends Component {
    constructor() {
        super();
        this.state = {
            inputText:''
        }
    }
    createTodo() {
        console.log(this.state.inputText);
        if (this.state.inputText) {
            this.props.createTodo && this.props.createTodo(this.state.inputText);
            this.setState({
                inputText:''
            })
        }
    }
    updateInputText(event) {
        this.setState({
            inputText: event.target.value
        })
    }
    render() {
        return (
            <form onSubmit={(e) => {
                e.preventDefault();
                this.createTodo();
            }}>
                <div className="form_item pd-20">
                    {/* <TodoLabel lblName={this.props.data.name}/> */}
                    <TodoInput inputText={this.state.inputText}
                        updateInputText={(event) => this.updateInputText(event)} />
                    <CreateTodoButton createTodo={() => this.createTodo()} />
                </div>
            </form>
        );
    }
}
export default CreateTodo;