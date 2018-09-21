import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Clickable } from "../StyledComponents";

const NavButtons = Clickable.extend`
  background-color: ${props => (props.active ? "#53edd3" : "white")};
  color: ${props => (props.active ? "#eee" : "")};
  margin: 3px;
  padding: 3px;
`;

class NavSwitch extends Component {
  render() {
    // 繪製所有群組按鈕
    const groupNode = this.props.groups.map((group, index) => {
      return (
        // <Link to={group.id ? `/group/${group.id}` : "/"} key={index}>
          <NavButtons
            key={index}
            onClick={e => this.props.switchGroup(group.id)}
            active={this.props.activeGroupID === group.id}
          >
            {group.name}
          </NavButtons>
        // </Link>
      );
    });
    return <div> {groupNode} </div>;
  }
}

export default NavSwitch;
