import React, { Component } from 'react';

class TodoInput extends Component {
    render() {
        return(
        <div className="control">
            <input
                type="text"
                placeholder="type sth..."
                value={this.props.inputText}
                onChange={this.props.updateInputText}
            />
        </div>)
    }
}

export default TodoInput;
