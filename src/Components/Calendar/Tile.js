import React, { Component } from "react";
import Content from "./Content";
import { getFullDateString } from "../../Utility/date";

class Tile extends Component {
  // getButtons() {
  //   const { start, end, offset, dateTransform } = this.props;
  //   const tiles = [];
  //   for (let point = start; point <= end; point++) {
  //     const date = dateTransform(point);
  //     console.log(date);
  //     tiles.push(
  //       <button className="day">
  //         <Content date={date} />
  //       </button>
  //     );
  //   }
  //   return { tiles };
  // }
  render() {
    const style_content = {
      display: "contents"
    };
    const { start, end, offset, dateTransform, data } = this.props;
    const tiles = [];
    let index = 0;
    let max = data.length;

    if (offset > 0) {
      for (let i = offset - 1; i >= 0; i--)
        tiles.push(<button className="day" key={-(i - 3)} />);
    }
    for (let point = start; point <= end; point++) {
      const date = dateTransform(point);
      let dayData = [];
      if (!!data && data.length > 0 && index < max) {
        if (data[index].date == getFullDateString(date)) {
          dayData = data[index];
          index++;
        }
      }
      tiles.push(
        <button className="day" key={date}>
          <Content date={date} point={point} dayData={dayData} />
        </button>
      );
    }
    let rest=((tiles.length % 7) - 7)*-1;
    for (let j = 0; j <rest; j++) {
      tiles.push(
        <button className="day" key={`rest_${j}`}>
          <div className="content">
            <div className="row">
              <span className="num">{j+1}</span>
            </div>
          </div>
        </button>
      );
    }
    return <a style={style_content}>{tiles}</a>;
  }
}
export default Tile;
