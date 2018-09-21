import React, { Component } from "react";
import { getDays } from "../../Utility/date";

class WeekDays extends Component {
  render() {
    const weekdays=[];
    getDays().forEach((item,index) => {
      weekdays.push(
        <div className="weekday" key={index}>{item}</div>
      )
    });
    return (
      <div className="weekdays">
        {weekdays}
      </div>
    );
  }
}

export default WeekDays;
