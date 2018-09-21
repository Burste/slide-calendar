import React,{Component} from 'react';

class TodoLabel extends Component{
    render(){
        return(
            <div>
                <label>{this.props.lblName}</label>
            </div>
        )
    }
}
export default TodoLabel;