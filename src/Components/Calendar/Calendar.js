import React, { Component } from "react";
import PropTypes from "prop-types";
import Navigation from "./Navigation";
import MonthView from "./MonthView";
import {
  getTimeStamp,
  getFullDateString,
  getBegin,
  getFormatString
} from "../../Utility/date";

const getActiveStartDate = props => {
  // const { activeStartDate } = props;
  // const dateFrom = activeStartDate || new Date();
  const { initYearMonth } = props;
  console.log("GET INIT YM");
  const dateFrom = getFormatString(initYearMonth) || new Date();
  return getBegin("month", dateFrom);
};

class Calendar extends Component {
  constructor() {
    super();
    this.setActiveStartDate = this.setActiveStartDate.bind(this);
    this.setDataFromExternal=this.setDataFromExternal.bind(this);
    this.state = {
      data: []
    };
  }
  /**
   * 由外部取得資料，
   * 若無資料則預設從 dataPath 取得
   * @param {string} path 
   */
  setDataFromExternal(path){
    console.log("SET DATA FROM EXTERNAL");
    const {dataSource} =this.props;
    let dataPath=path ||dataSource;
    this.getData(dataPath);
  }
  componentDidMount() {
    this.state.activeStartDate = getActiveStartDate(this.props);
    const { dataSource } = this.props;
    //this.getData(dataSource);
    this.setDataFromExternal('');
  }
  setActiveStartDate(activeStartDate) {
    if (!!activeStartDate) {
      this.setState({ activeStartDate }, function() {
        console.log("SETACTIVESTARTDATE");
      });
    }
    // if (typeof setActiveStartDate == "function") setActiveStartDate();
  }
  get initDataKeySetting() {
    // 引入資料
    const { dataKeySetting } = this.props;
    const defaultSetting = [
      "guaranteed",
      "date",
      "price",
      "availableVacancy",
      "totalVacancy",
      "status"
    ];
    const setting = dataKeySetting || defaultSetting;
    // 資料分類及排序
    return setting;
  }
  getData(path) {
    let jsonData = null;
    if (typeof path === "string") {
      if (path) {
        console.log("GET JSON");
        fetch(path)
          .then(response => {
            if (!response.ok) throw new Error(response.statusText);
            return response.json();
          })
          .then(data => {
            let fullData = data.sort(function(a, b) {
              return getTimeStamp(a["date"]) < getTimeStamp(b["date"])
                ? -1
                : getTimeStamp(a["date"]) == getTimeStamp(b["date"])
                  ? 0
                  : 1;
            });

            jsonData = fullData;
            this.setState({ data: jsonData });
          })
          .catch(err => {
            console.log("Failed to fetch :" + err);
          });
      }
    }
    if(typeof path==='object'){console.log("GET OBJECT");console.log(path)
      jsonData= path;
      this.setState({ data: jsonData });
    }
  }

  renderNavigation() {
    const { data, activeStartDate } = this.state;
    return (
      <Navigation
        activeStartDate={getActiveStartDate(this.props)}
        setActiveStartDate={this.setActiveStartDate}
      />
    );
  }
  render() {
    const { data, activeStartDate } = this.state;
    return (
      <div id="react-calendar">
        {/* {this.renderNavigation()} */}
        <Navigation
        activeStartDate={activeStartDate}
        setActiveStartDate={this.setActiveStartDate}
      />
        <MonthView
          data={data}
          activeStartDate={activeStartDate}
          dataKeySetting={this.initDataKeySetting}
        />
      </div>
    );
  }
}
export default Calendar;

Calendar.propTypes = {
  activeStartDate: PropTypes.instanceOf(Date)
};
