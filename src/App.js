import React, { Component } from "react";
import "./calendar-style.scss";
import Calendar from "./Components/Calendar/Calendar";
class App extends Component {
  render() {
    return (
      <Calendar
        dataSource={"./src/JSON/data2.json"}
        // dataSource={[
        //   {
        //     guaranteed: true,
        //     date: "2018/08/08",
        //     price: "234567",
        //     availableVancancy: 0,
        //     totalVacnacy: 20,
        //     status: "報名"
        //   },
        //   {
        //     guaranteed: true,
        //     date: "2018/08/09",
        //     price: "1234567",
        //     availableVancancy: 0,
        //     totalVacnacy: 7,
        //     status: "關團"
        //   }
        // ]}
        initYearMonth={"201808"} //TODO:該月無資料狀況
        // dataKeySetting={['guaranteed','status','available','total','price']}
        setActiveStartDate={function() {
          console.log("Hello from setActiveStartDate");
        }}
      />
    );
  }
}

export default App;
