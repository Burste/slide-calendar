import React, { Component } from "react";
import {
  getMonth,
  getYear,
  getBeginPrevious,
  getBeginOfPreviousMonth,
  getBeginOfNextMonth
} from "../../Utility/date";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.onClickNext = this.onClickNext.bind(this);
    this.onClickPrev = this.onClickPrev.bind(this);
    this.state = {
      activeStartDate: this.props.activeStartDate,
      setActiveStartDate: this.props.setActiveStartDate
    };
  }
  setLabel(dateArray) {
    const children = [];
    dateArray.forEach((item, index) => {
      children.push(`${getYear(new Date(item))}/${getMonth(new Date(item))}`);
    });
    return children;
  }

  onClickNext() {
    const { activeStartDate: date, setActiveStartDate } = this.props;
    this.state.activeStartDate = getBeginOfNextMonth(date);
    console.log(this.state);
    console.log("ONCLICKNEXT");
    setActiveStartDate(getBeginOfNextMonth(date));
  }
  onClickPrev() {
    const { activeStartDate: date, setActiveStartDate } = this.props;
    this.state.activeStartDate = getBeginOfPreviousMonth(date);
    console.log("ONCLICKPREV");
    setActiveStartDate(getBeginOfPreviousMonth(date));
  }
  renderLabels() {
    const {activeStartDate, activeStartDate: date } = this.props;
    let children = [];
    if (date != null) {
      const dateSet = this.setLabel([
        getBeginOfPreviousMonth(date),
        date,
        getBeginOfNextMonth(date)
      ]);
      dateSet.forEach((item, index) => {
        children.push(
          <button className="label" key={index}>
            {item}
          </button>
        );
      });
    }
    return children;
    // console.log(this.setLabel(dateSet));
  }
  render() {
    // this.renderLabels();
    return (
      <div className="navigation">
        <button className="arrow prev-button" onClick={this.onClickPrev} />
        {this.renderLabels()}
        <button className="arrow next-button" onClick={this.onClickNext} />
      </div>
    );
  }
}

export default Navigation;
