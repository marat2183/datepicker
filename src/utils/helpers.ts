const arrayRange = (start: number, stop: number, step: number = 1): Array<number> =>
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
  const daysOfWeek = Array.from(Array(numOfDays).keys());
  const needToAdd = (dayOfWeekForFirstDay - 1 + 7) % 7;
  const nullArray = new Array(needToAdd).fill(null);
  return [...nullArray, ...daysOfWeek];
};

const helper = {
  arrayRange,
  getDays,
  getMothNumOfFirstDay,
  getDaysToShow,
};

export default helper;
