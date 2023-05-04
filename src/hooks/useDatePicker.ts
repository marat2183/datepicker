import { useState } from "react";
import helper from "../utils/helpers";
import { months, daysOfWeek, minMonthNum, maxMonthNum, minDayNum, minYearNum, maxYearNum } from "../utils/constants";

const getNextMonth = (currentMonth: number) : number => {
  return (currentMonth + 1) % (maxMonthNum + 1)
}

const getPrevMonth = (currentMonth: number) : number => {
  return ((currentMonth - 1) + (maxMonthNum + 1)) % (maxMonthNum + 1)
}

const useDatePicker = (initialDate: Date = new Date()) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [selectedDay, setSelectedDay] = useState<number>(initialDate.getDay());

  const selectedDate = new Date(selectedYear, selectedMonth, selectedDay);

  const daysInMonth = helper.getDays(selectedYear, selectedMonth + 1);
  const dayOfWeekForFirstDay = helper.getMothNumOfFirstDay(
    selectedYear,
    selectedMonth
  );

  const daysArrayToShow: Array<null | number> = helper.getDaysToShow(daysInMonth, dayOfWeekForFirstDay);
  const yearsRange: Array<number> = helper.arrayRange(minYearNum, maxYearNum);
  const daysRange: Array<number> = helper.arrayRange(1, daysInMonth);
  const monthsRange: Array<string> = months;
  const daysOfWeekRange: Array<string>  = daysOfWeek

  const handleSetYear = (year: string | number) => {
    return setSelectedYear(Number(year));
  };

  const handleSetMonth = (month: string | number) => {
    const daysInNewMonth = helper.getDays(selectedYear, Number(month) + 1);
    if (selectedDay === daysInMonth && daysInMonth > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
      setSelectedMonth(Number(month));
      return;
    }
    return setSelectedMonth(Number(month));
  };

  const handleSetDay = (day: number | string) => {
    return setSelectedDay(Number(day));
  };

  const handleClickPrevMonth = () => {
    setSelectedMonth((current) => getPrevMonth(current));

    const prevMonth = getNextMonth(selectedMonth);
    const daysInPrevMonth = helper.getDays(selectedYear, prevMonth + 1)
    if (selectedDay === daysInMonth && daysInMonth > daysInPrevMonth) {
      setSelectedDay(daysInPrevMonth)
    }
    return;
  };

  const handleClickNextMonth = () => {
    setSelectedMonth((current) => getNextMonth(current));

    const nextMonth = getNextMonth(selectedMonth);
    const daysInNextMonth = helper.getDays(selectedYear, nextMonth + 1)
    if (selectedDay === daysInMonth && daysInMonth > daysInNextMonth) {
      setSelectedDay(daysInNextMonth)
    }
    return;
  };

  const handleClickPrevYear = () => {
    setSelectedYear((current) => current - 1);
  };

  const handleClickNextYear = () => {
    setSelectedYear((current) => current + 1);
  };

  const handleClickNextDay = () => {
    if (selectedDay === daysInMonth && selectedMonth !== maxMonthNum) {
      setSelectedDay(1);
      setSelectedMonth((current) => getNextMonth(current));
      return;
    }

    if (selectedDay === daysInMonth && selectedMonth === maxMonthNum) {
      setSelectedDay(1);
      setSelectedMonth((current) => getNextMonth(current));
      setSelectedYear((current) => current + 1)
      return;
    }

    setSelectedDay((current) => current + 1);
    return;
  };

  const handleClickPrevDay = () => {
    if (selectedDay === minDayNum && selectedMonth !== minMonthNum) {
      const daysInPrevMonth = helper.getDays(selectedYear, selectedMonth);
      setSelectedDay(daysInPrevMonth);
      setSelectedMonth((current) => getPrevMonth(current));
      return;
    }

    if (selectedDay === minDayNum && selectedMonth === minMonthNum) {
      const daysInPrevMonth = helper.getDays(selectedYear, selectedMonth);
      setSelectedDay(daysInPrevMonth);
      setSelectedMonth((current) => getPrevMonth(current));
      setSelectedYear((current) => current - 1)
      return;
    }

    setSelectedDay((current) => current - 1);
    return;
  };

  return {
    daysArrayToShow,
    selectedDay,
    selectedMonth,
    selectedYear,
    setSelectedDay,
    setSelectedMonth,
    setSelectedYear,
    handleClickNextMonth,
    handleClickPrevMonth,
    handleClickNextYear,
    handleClickPrevYear,
    handleClickNextDay,
    handleClickPrevDay,
    handleSetYear,
    handleSetMonth,
    handleSetDay,
    selectedDate,
    yearsRange,
    monthsRange,
    daysRange,
    daysOfWeekRange
  };
};

export default useDatePicker;
