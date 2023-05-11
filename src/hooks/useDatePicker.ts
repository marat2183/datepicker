import { useState } from "react";
import helperUtil from "../utils/helpers";
import {
  months,
  daysOfWeek,
  minMonthNum,
  maxMonthNum,
  minDayNum,
  minYearNum,
  maxYearNum,
} from "../utils/constants";

const useDatePicker = (initialDate: Date = new Date()) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [selectedDay, setSelectedDay] = useState<number>(initialDate.getDate());

  const [startSelectedDate, setStartSelectedDate] = useState<Date | null>(null);
  const [endSelectedDate, setEndSelectedDate] = useState<Date | null>(null);

  const daysInMonth = helperUtil.getDays(selectedYear, selectedMonth + 1);
  const dayOfWeekForFirstDay = helperUtil.getMothNumOfFirstDay(
    selectedYear,
    selectedMonth
  );

  const daysArrayToShow: Array<null | number> = helperUtil.getDaysToShow(
    daysInMonth,
    dayOfWeekForFirstDay
  );
  const daysOfWeekToShow: Array<string> = daysOfWeek;

  const yearsRange: Array<number> = helperUtil.arrayRange(minYearNum, maxYearNum);
  const daysRange: Array<number> = helperUtil.arrayRange(1, daysInMonth);
  const monthsRange: Array<string> = months;
  
  const handleSetYear = (year: string | number) => {
    return setSelectedYear(Number(year));
  };

  const handleSetMonth = (month: string | number) => {
    const daysInNewMonth = helperUtil.getDays(selectedYear, Number(month) + 1);
    if (selectedDay === daysInMonth && daysInMonth > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
      setSelectedMonth(Number(month));
      return;
    }
    return setSelectedMonth(Number(month));
  };

  const handleSetDay = (day: number | string) => {
    setSelectedDay(Number(day));
    if (startSelectedDate && endSelectedDate) {
      setStartSelectedDate(new Date(selectedYear, selectedMonth, Number(day)));
      setEndSelectedDate(null);
      return;
    }

    if (startSelectedDate) {
      setEndSelectedDate(new Date(selectedYear, selectedMonth, Number(day)));
      return;
    }

    setStartSelectedDate(new Date(selectedYear, selectedMonth, Number(day)));
    return;
  };

  const handleClickPrevMonth = () => {
    setSelectedMonth((current) => helperUtil.getPrevMonth(current));

    const prevMonth = helperUtil.getNextMonth(selectedMonth);
    const daysInPrevMonth = helperUtil.getDays(selectedYear, prevMonth + 1);
    if (selectedDay === daysInMonth && daysInMonth > daysInPrevMonth) {
      setSelectedDay(daysInPrevMonth);
    }
    return;
  };

  const handleClickNextMonth = () => {
    setSelectedMonth((current) => helperUtil.getNextMonth(current));

    const nextMonth = helperUtil.getNextMonth(selectedMonth);
    const daysInNextMonth = helperUtil.getDays(selectedYear, nextMonth + 1);
    if (selectedDay === daysInMonth && daysInMonth > daysInNextMonth) {
      setSelectedDay(daysInNextMonth);
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
      setSelectedMonth((current) => helperUtil.getNextMonth(current));
      return;
    }

    if (selectedDay === daysInMonth && selectedMonth === maxMonthNum) {
      setSelectedDay(1);
      setSelectedMonth((current) => helperUtil.getNextMonth(current));
      setSelectedYear((current) => current + 1);
      return;
    }

    setSelectedDay((current) => current + 1);
    return;
  };

  const handleClickPrevDay = () => {
    if (selectedDay === minDayNum && selectedMonth !== minMonthNum) {
      const daysInPrevMonth = helperUtil.getDays(selectedYear, selectedMonth);
      setSelectedDay(daysInPrevMonth);
      setSelectedMonth((current) => helperUtil.getPrevMonth(current));
      return;
    }

    if (selectedDay === minDayNum && selectedMonth === minMonthNum) {
      const daysInPrevMonth = helperUtil.getDays(selectedYear, selectedMonth);
      setSelectedDay(daysInPrevMonth);
      setSelectedMonth((current) => helperUtil.getPrevMonth(current));
      setSelectedYear((current) => current - 1);
      return;
    }

    setSelectedDay((current) => current - 1);
    return;
  };

  return {
    state : {
      selectedDay,
      selectedMonth,
      selectedYear,
      startSelectedDate,
      endSelectedDate,
    },
    setState : {
      setSelectedDay,
      setSelectedMonth,
      setSelectedYear,
    },
    handlers : {
      handleClickNextMonth,
      handleClickPrevMonth,
      handleClickNextYear,
      handleClickPrevYear,
      handleClickNextDay,
      handleClickPrevDay,
      handleSetYear,
      handleSetMonth,
      handleSetDay,
    },
    optionsDate : {
      yearsRange,
      monthsRange,
      daysRange,
    },
    dateToShow: {
      daysOfWeekToShow,
      daysArrayToShow
    }
  };
};

export default useDatePicker;
