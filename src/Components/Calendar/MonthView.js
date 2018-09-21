import React, { Component } from "react";
import WeekDays from "./WeekDays";
import Days from "./Days";

class MonthView extends Component {
  constructor() {
    super();
    this.state = {
      purifiedData: []
    };
  }

  /**
   * 功能 : 篩選日期重複資料
   * 說明 : 子層組件產生時會比對日期，若渲染日期與資料日期相同則進行資料傳入，
   *        同一天僅可傳入一筆資料，如果出現相同資料時後續日期將無法正確傳入
   *        篩選優先順序為 : 可報名 -> 保證出團 -> 低價格
   */
  statusScore(text) {
    switch (text) {
      case "報名":
        return 2;
      case "候補":
        return 1;
      case "關團":
        return 0;
      default:
        return 0;
    }
  }
  guaranteeScore(text) {
    return !!text == true ? 1 : 0;
  }
  priceScore(text) {
    return -text;
  }
  /**
   * 依評分進行比分，回傳高分項目
   * @param {Array} array
   */
  checkValue(array) {
    let max = null;
    let min = null;
    let index = 0;
    for (index = 0; index < array.length; index++) {
      max = 0;
      min = 0;
      if (array[index] > array[max]) max = index;
      if (array[index] < array[min]) min = index;
    }
    if (max === min) return true;
    else return max;
  }
  removeDuplicatedData(arrDate, arrIndex, data) {
    let newData = [];
    if (data.length > 0) {
      for (let start = 0; start < arrDate.length; start++) {
        //傳入重複index 比較後傳回
        if (arrIndex[start].indexOf(",") > 0)
          newData.push(data[this.compare(arrIndex[start], data)]);
        else newData.push(data[arrIndex[start]]);
      }
    }
    return newData;
  }
  compare(indexString, data) {
    // 可報名 -> 保證出團 -> 低價格
    // status -> guarantee -> price

    console.log("COMPARE");
    if (indexString.length > 0 && data.length > 0) {
      let arrStatus = [];
      let arrGuarantee = [];
      let arrPrice = [];
      let index = indexString.split(","); // index 陣列 (2,3)
      if (index.length > 0) {
        //各類比較評分列表
        for (var i = 0; i < index.length; i++) {
          let obj = data[index[i]];
          arrStatus.push(this.statusScore(obj.status));
          arrGuarantee.push(this.guaranteeScore(obj.guarantee));
          arrPrice.push(this.priceScore(obj.price));
        }
        //比分關卡
        let checkList = [arrStatus, arrGuarantee, arrPrice];
        //各類得分比較後結果
        let result = null;
        for (let chklIndex = 0; chklIndex < checkList.length; chklIndex++) {
          if (typeof this.checkValue(checkList[chklIndex]) === "number") {
            result = this.checkValue(checkList[chklIndex]);
            break;
          }
        }
        return index[result];
      }
    }
  }
  purifiedData(data) {
    // let data = this.monthData;
    // const { data } = this.props;
    let count = {};
    let newData = [];
    let arrDate = [];
    let arrIndex = [];
    if (!!data && data.length > 0) {
      console.log("PURIFIED DATA");
      data.forEach((item, index, array) => {
        count[item.date] = (count[item.date] || 0) + 1;
        count[item.date + "_i"] = (count[item.date + "_i"] || "") + `,${index}`;
        if (count[item.date] <= 1) {
          arrDate.push(item.date);
        }
      });
      for (let i = 0; i < arrDate.length; i++) {
        let key = arrDate[i]; // Date
        arrIndex.push(count[arrDate[i] + "_i"].slice(1)); // Value
      }
      //   console.log(count); //{2018/08/01: 1, 2018/08/01_i: ",0", 2018/08/06: 1, 2018/08/06_i: ",1", 2018/08/07: 2, …}
      //   console.log(arrDate); //["2018/08/01", "2018/08/06", "2018/08/07", "2018/08/08", "2018/08/09", "2018/08/14", "2018/08/19", "2018/08/20", "2018/08/21", "2018/08/22", "2018/08/23", "2018/08/25", "2018/08/26"]
      //   console.log(arrIndex); // ["0", "1", "2,3", "4", "5,6", "7", "8", "9", "10,11", "12", "13", "14", "15"]
      //   console.log(this.removeDuplicatedData(arrDate, arrIndex, data)) ;
      newData = this.removeDuplicatedData(arrDate, arrIndex, data);
    }
    return newData;
  }
  initDataKey(obj, fn) {
    if (typeof fn !== "function") return obj;
    let keys = Object.keys(obj);
    let result = {};
    for (let i = 0; i < keys.length; i++) {
      let key = keys[i],
        val = obj[key],
        str = fn(key, val, i);
      if (typeof str === "string" && str !== "") key = str;
      result[key] = val;
    }
    return result;
  }
  get initData() {
    const { data, dataKeySetting } = this.props;
    //const keys = ['guaranteed', 'date',"price","availableVacancy","totalVacancy","status"];
    const keys = dataKeySetting;
    let newData = [];
    let result = [];
    if (data!=null) {
      console.log("DATA");console.log(data)
      for (let i = 0; i < data.length; i++) {
        result.push(this.initDataKey(data[i], (key, val, i) => keys[i]));
      }
      newData = this.purifiedData(result);
    }
    return newData;
  }
  render() {
    const style_flex = {
      display: "flex",
      alignItems: "flex-end"
    };
    const style_flexGrow = {
      flexGrow: 1,
      width: "100%"
    };
    const { activeStartDate } = this.props;
    return (
      <div className="month-view">
        <div style={style_flex}>
          <div style={style_flexGrow}>
            <WeekDays />
            <Days
              data={this.initData}
              // data={this.purifiedData}
              activeStartDate={activeStartDate}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MonthView;
