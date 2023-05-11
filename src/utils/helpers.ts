import { maxMonthNum } from "../utils/constants";

const arrayRange = (
  start: number,
  stop: number,
  step: number = 1
): Array<number> =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (_, index) => start + index * step
  );

const getDays = (year: number, month: number): number => {
  return new Date(year, month, 0).getDate();
};

const getMothNumOfFirstDay = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

const getDaysToShow = (
  numOfDays: number,
  dayOfWeekForFirstDay: number
): Array<number | null> => {
  const daysOfWeek = arrayRange(1, numOfDays);
  const needToAdd = (dayOfWeekForFirstDay - 1 + 7) % 7;
  const nullArray = new Array(needToAdd).fill(null);
  return [...nullArray, ...daysOfWeek];
};

const getNextMonth = (currentMonth: number): number => {
  return (currentMonth + 1) % (maxMonthNum + 1);
};

const getPrevMonth = (currentMonth: number): number => {
  return (currentMonth - 1 + (maxMonthNum + 1)) % (maxMonthNum + 1);
};

const helper = {
  arrayRange,
  getDays,
  getMothNumOfFirstDay,
  getDaysToShow,
  getNextMonth,
  getPrevMonth

};

export default helper;
