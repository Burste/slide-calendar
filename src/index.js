import React from "react";
import ReactDOM from "react-dom";
import Calendar from "./Components/Calendar/Calendar"
import "./calendar-style.scss";
import App from "./App";
//import registerServiceWorker from './registerServiceWorker';
window.myCalendar =
ReactDOM.render(
  // <App />,
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

    setDataFromExternal={''}
    setActiveStartDate={""}
  />,
  document.getElementById('container')
);
