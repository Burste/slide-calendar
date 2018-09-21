import React, { Component } from "react";
import PropTypes from 'prop-types';
import Tile from "./Tile";
import {
  getEndOfDay,
  getEndOfMonth,
  getBeginOfDay,
  getDayOfWeek,
  getYear,
  getMonth,getDaysInMonth,
  getMonthIndex,
  getDay
} from "../../Utility/date";
import Days from "./Days";

class Day extends Component {
  get offset() {
    const { activeStartDate } = this.props;
    const offset=getDayOfWeek(activeStartDate);
    return offset;
  }
  get start() {
    // const {activeStartDate}=this.props;
    return 1;
  }
  /**
   * Defines on which day of the month the grid shall end. If we simply show current
   * month, we need to stop on the last day of the month, but if showNeighboringMonth
   * is set to true, we need to find the end of the week the last day of the month is in.
   */
  get end() {
    const { activeStartDate } = this.props;
    const daysInMonth = getDaysInMonth(activeStartDate); //總天數
    return daysInMonth;
  }
  get year() {
    const { activeStartDate } = this.props;
    return getYear(activeStartDate); //年
  }
  get monthIndex() {
    const { activeStartDate } = this.props;
    return getMonthIndex(activeStartDate);
  }
  
  
  render() {
      const{
          activeStartDate,data
      }=this.props;
    return (
      <Tile
        // date={date}
        // minDateTransform={getBeginOfDay}
        // maxDateTransform={getEndOfDay}
        data={data}
        activeStartDate={activeStartDate}
        dateTransform={day => new Date(this.year, this.monthIndex, day)}
        start={this.start}
        end={this.end}
        offset={this.offset}
      >
      
      </Tile>
    );
  }
}

export default Day ;
// Day.propTypes={
//   activeStartDate: PropTypes.instanceOf(Date)
// }