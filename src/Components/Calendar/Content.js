import React, { Component } from "react";

class Content extends Component {
  get getGuarantee() {
    const { dayData } = this.props;
    if (dayData.guaranteed) return <span className="flag">保證出團</span>;
    else return;
  }
  get status() {
    const { dayData } = this.props;
    // [報名,預定,截止,額滿,關團]
    switch (dayData.status) {
      case "報名":
      case "預定":
      case "後補":
        return <span className="is-avail">{dayData.status}</span>;
      case "額滿":
      case "截止":
      case "關團":
        return <span className="is-closed">{dayData.status}</span>;
      default:
        return;
    }
  }
  get availVacancy() {
    const { dayData } = this.props;
    if (dayData.availableVacancy>=0)
      return (
        <div>
          可賣：<span className="num seat_vacancy">
            {dayData.availableVacancy}
          </span>
        </div>
      );
    else return;
  }
  get totalVacancy() {
    const { dayData } = this.props;
    if (dayData.totalVacancy>=0)
      return (
        <div>
          團位：<span className="num seat_released">
            {dayData.totalVacancy}
          </span>
        </div>
      );
    else return;
  }
  get price() {
    const { dayData } = this.props;

    if (dayData.price>=0) {
      let price = dayData.price
        .toString()
        .replace(/^(-?\d+?)((?:\d{3})+)(?=\.\d+$|$)/, function(
          all,
          pre,
          groupOf3Digital
        ) {
          return pre + groupOf3Digital.replace(/\d{3}/g, ",$&");
        });
      return <span className="price">${price}</span>;
    } else return;
  }
  render() {
    const { point, dayData } = this.props;
    return (
      <div className="content">
        <div className="row">
          <span className="num">{point}</span>
          {/* <span className="flag">保證出團</span>; */}
          {this.getGuarantee}
        </div>
        <div className="detail">
          {/* <span className="is-avail">報名</span> */}
          {this.status}
          {/* <div>
            團位：<span className="num seat_released">
              {dayData.totalVacnacy}
            </span>
          </div> */}
          {this.totalVacancy}
          {/* <div>
            可賣：<span className="num seat_vacancy">
              {dayData.availableVancancy}
            </span>
          </div> */}
          {this.availVacancy}
          {/* <span className="price">${dayData.price}</span> */}
          {this.price}
        </div>
      </div>
    );
  }
  
}

export default Content;
