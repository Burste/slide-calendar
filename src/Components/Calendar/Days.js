import React, { Component } from "react";
import PropTypes from "prop-types";
import Day from "./Day";
import { getYear, getMonth } from "../../Utility/date";
import { throws } from "assert";

class Days extends Component {
 
  get monthData() {
    // 改成獲取篩選後的資料
    const {data,activeStartDate}=this.props;
    const currentMonthData = [];
    if (!!data && !!activeStartDate) {
      console.log("MONTH DATA")
      const currentMonth = `${getYear(activeStartDate)}/${getMonth(activeStartDate)}`;
      data.forEach((item, index) => {
        let date = `${getYear(item.date)}/${getMonth(item.date)}`;
        if (date == currentMonth) currentMonthData.push(item);
      });
    }
    return currentMonthData;
  }
  render() {
    const { activeStartDate } = this.props;
    return (
      <div className="days">
        <Day
          activeStartDate={activeStartDate}
          data={this.monthData}
        />
      </div>
    );
  }
}

export default Days;
// Days.propTypes = {
//   activeStartDate: PropTypes.instanceOf(Date)
// };
