/**
 * Simple getters
 */
export const getFullDateString = date => {
  let now = date||new Date();
  if(date instanceof Date) return `${getYear(now)}/${getMonth(now)}/${getDay(now)}`;
  throw new Error(`Failed to get fullDateString : ${date}.`);
};
export const getFormatString= date =>{
  if(date instanceof Date) return getYear(date)+'/'+getMonth(date);
  if(typeof date==="string"){
    var result="";
    var tmp=date.substring(0, 4);
    result+=tmp+'/'+date.substring(4,date.length);
    return result;
  }
}
export const getTimeStamp = date => {
  if (date instanceof Date) return date.getTime();
  if (typeof date === "number") return date;
  if (typeof date === "string") return new Date(date).getTime();
  throw new Error(`Failed to get timestamp : ${date}.`);
};

export const getYear = date => {
  if (date instanceof Date) return date.getFullYear();
  if (typeof date === "number") return date;
  if (typeof date === "string" || date === "object")
    return new Date(date).getFullYear();
  throw new Error(`Failed to get year : ${date}.`);
};
/**
 * 取得真實月份
 * @param {Date} date
 */
export const getMonth = date => ("0" + (new Date(date).getMonth() + 1)).slice(-2);

export const getMonthIndex = date => new Date(date).getMonth();

const getDifferentMonth = (date, offset) => {
  const year = getYear(date);
  const previousMonthIndex = getMonthIndex(date) + offset;
  return new Date(year, previousMonthIndex, 1);
};
/**
 * 回傳起始月日
 * @param {Date} date
 */
export const getBeginOfMonth = date => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex, 1);
};
export const getBeginOfPreviousMonth = (date, offset = 1) => {
  const previousMonth = getDifferentMonth(date, -offset);
  return getBeginOfMonth(previousMonth);
};

export const getBeginOfNextMonth = (date, offset = 1) => {
  const nextMonth = getDifferentMonth(date, offset);
  return getBeginOfMonth(nextMonth);
};

export const getDay = date => ("0" + date.getDate()).slice(-2);


/**
 * 回傳起始日
 * @param {Date} date
 */
export const getBeginOfDay = date => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);
  return new Date(year, monthIndex, day);
};

export const getBeginPrevious = date => {
  if (date instanceof Date) return getBeginOfPreviousMonth(date);
  else throw Error(`Invalid date: ${date}`);
};

export const getBeginNext = date => {
  if (date instanceof Date) return getBeginOfNextMonth(date);
  else throw Error(`Invalid date: ${date}`);
};

/**
 * 回傳起始值
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export const getBegin = (rangeType, date) => {
  switch (rangeType) {
    case "month":
      return getBeginOfMonth(date);
    case "day":
      return getBeginOfDay(date);

    default:
      return new Error(`Invaild rangeType : ${rangeType}`);
  }
};

/**
 * 回傳結尾值
 * @param {String} rangeType Range type (e.g. 'day')
 * @param {Date} date Date.
 */
export const getEnd = (rangeType, date) => {
  switch (rangeType) {
    case "month":
      return getEndOfMonth(date);
    case "day":
      return getEndOfDay(date);

    default:
      return new Error(`Invaild rangeType : ${rangeType}`);
  }
};

export const getEndOfMonth = date => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  return new Date(year, monthIndex + 1, 1, 0, 0, 0, -1);
};

export const getEndOfDay = date => {
  const year = getYear(date);
  const monthIndex = getMonthIndex(date);
  const day = getDay(date);
  return new Date(year, monthIndex, day + 1, 0, 0, 0, -1);
};
export const getDaysInMonth = date => {
  const year = getYear(new Date(date));
  const monthIndex = getMonthIndex(new Date(date));
  return new Date(year, monthIndex + 1, 0).getDate();
};

export const getDayOfWeek = date => {
  const weekday = new Date(date).getDay();
  return weekday;
  // Shifts days of the week so that Monday is 0, Sunday is 6
  //return (weekday + 6) % 7;
};
/**
 * 取得星期
 * @param {*} date
 * @param {*} calendarType
 */
export const getDayName = date => {
  const dayNames = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  // const weekday = dayNames[new Date(date).getDay()];
  const weekday = new Date(date).getDay();
  return weekday;
};
/**
 * 回傳星期陣列
 */
export const getDays = () => {
  const dayNames = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  return dayNames;
};
