import React,{ Component} from 'react';

class Banner extends Component {
    render(){
        return(
            <div className="banner">
                <a className="wrap">
                    <img className="img" src={this.props.imgURL}/>
                </a>
            </div>
        )   
    }
}
export default Banner ;