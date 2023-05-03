const getDays = (year: number, month: number) : number => {
  return new Date(year, month, 0).getDate();
};

const getMothNumOfFirstDay = (year: number, month: number) : number => {
  return new Date(year, month, 1).getDay();
}

const getDaysToShow = (numOfDays: number, dayOfWeekForFirstDay: number): Array<number | null> => {
  const daysOfWeek = Array.from(Array(numOfDays).keys()); 
  const needToAdd = (dayOfWeekForFirstDay - 1 + 7) % 7;
  const nullArray = new Array(needToAdd).fill(null);
  return [...nullArray, ...daysOfWeek]
}

const helper = {
  getDays,
  getMothNumOfFirstDay,
  getDaysToShow
}

export default helper;