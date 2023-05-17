import { useState } from "react";
import helperUtil from "../utils/helpers";
import {
  months,
  daysOfWeek,
  englishDaysOfWeek,
  minMonthNum,
  maxMonthNum,
  minDayNum,
  minYearNum,
  maxYearNum,
} from "../utils/constants";

const useDatePicker = (
  initialDate: Date = new Date(),
  isSelectionRange: boolean = false,
  type: string = "english"
) => {
  const [selectedMonth, setSelectedMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [selectedYear, setSelectedYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [selectedDate, setSelectedDate] = useState<number>(
    initialDate.getDate()
  );

  const [startSelectedDate, setStartSelectedDate] = useState<Date | null>(null);
  const [endSelectedDate, setEndSelectedDate] = useState<Date | null>(null);

  const daysInMonth = helperUtil.getDays(selectedYear, selectedMonth + 1);
  const dayOfWeekForFirstDay = helperUtil.getMothNumOfFirstDay(
    selectedYear,
    selectedMonth
  );

  const daysArrayToShow: Array<null | number> = helperUtil.getDaysToShow(
    daysInMonth,
    dayOfWeekForFirstDay,
    type
  );
  const daysOfWeekToShow: Array<string> =
    type === "russian" ? daysOfWeek : englishDaysOfWeek;

    const startSelectionDate = startSelectedDate
    ? startSelectedDate.getTime()
    : 0;
  const endSelectionDate = endSelectedDate
    ? endSelectedDate.getTime()
    : 0;

  const startSelectionDateToShow =
    startSelectionDate && endSelectionDate
      ? Math.min(startSelectionDate, endSelectionDate)
      : startSelectionDate;
  const endSelectionDateToShow =
    startSelectionDate && endSelectionDate
      ? Math.max(startSelectionDate, endSelectionDate)
      : endSelectionDate;

  const yearsRange: Array<number> = helperUtil.arrayRange(
    minYearNum,
    maxYearNum
  );
  const daysRange: Array<number> = helperUtil.arrayRange(1, daysInMonth);
  const monthsRange: Array<string> = months;

  const handleSetYear = (year: string | number) => {
    return setSelectedYear(Number(year));
  };

  const handleSetMonth = (month: string | number) => {
    const daysInNewMonth = helperUtil.getDays(selectedYear, Number(month) + 1);
    if (selectedDate === daysInMonth && daysInMonth > daysInNewMonth) {
      setSelectedDate(daysInNewMonth);
      setSelectedMonth(Number(month));
      return;
    }
    return setSelectedMonth(Number(month));
  };

  const handleSetSelectionRangeDay = (day: number | string) => {
    setSelectedDate(Number(day));
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

  const handleSetDay = (day: number | string) => {
    if (isSelectionRange) {
      handleSetSelectionRangeDay(day);
      return;
    }
    setSelectedDate(Number(day));
    setStartSelectedDate(new Date(selectedYear, selectedMonth, Number(day)));
    setEndSelectedDate(new Date(selectedYear, selectedMonth, Number(day)));
  };

  const handleClickPrevMonth = () => {
    setSelectedMonth((current) => helperUtil.getPrevMonth(current));

    const prevMonth = helperUtil.getNextMonth(selectedMonth);
    const daysInPrevMonth = helperUtil.getDays(selectedYear, prevMonth + 1);
    if (selectedDate === daysInMonth && daysInMonth > daysInPrevMonth) {
      setSelectedDate(daysInPrevMonth);
    }
    return;
  };

  const handleClickNextMonth = () => {
    setSelectedMonth((current) => helperUtil.getNextMonth(current));

    const nextMonth = helperUtil.getNextMonth(selectedMonth);
    const daysInNextMonth = helperUtil.getDays(selectedYear, nextMonth + 1);
    if (selectedDate === daysInMonth && daysInMonth > daysInNextMonth) {
      setSelectedDate(daysInNextMonth);
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
    if (selectedDate === daysInMonth && selectedMonth !== maxMonthNum) {
      setSelectedDate(1);
      setSelectedMonth((current) => helperUtil.getNextMonth(current));
      return;
    }

    if (selectedDate === daysInMonth && selectedMonth === maxMonthNum) {
      setSelectedDate(1);
      setSelectedMonth((current) => helperUtil.getNextMonth(current));
      setSelectedYear((current) => current + 1);
      return;
    }

    setSelectedDate((current) => current + 1);
    return;
  };

  const handleClickPrevDay = () => {
    if (selectedDate === minDayNum && selectedMonth !== minMonthNum) {
      const daysInPrevMonth = helperUtil.getDays(selectedYear, selectedMonth);
      setSelectedDate(daysInPrevMonth);
      setSelectedMonth((current) => helperUtil.getPrevMonth(current));
      return;
    }

    if (selectedDate === minDayNum && selectedMonth === minMonthNum) {
      const daysInPrevMonth = helperUtil.getDays(selectedYear, selectedMonth);
      setSelectedDate(daysInPrevMonth);
      setSelectedMonth((current) => helperUtil.getPrevMonth(current));
      setSelectedYear((current) => current - 1);
      return;
    }

    setSelectedDate((current) => current - 1);
    return;
  };

  return {
    state: {
      selectedDate,
      selectedMonth,
      selectedYear,
      startSelectedDate,
      endSelectedDate,
    },
    setState: {
      setSelectedDate,
      setSelectedMonth,
      setSelectedYear,
    },
    handlers: {
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
    optionsData: {
      yearsRange,
      monthsRange,
      daysRange,
    },
    dataToShow: {
      daysOfWeekToShow,
      daysArrayToShow,
      startSelectionDateToShow : startSelectionDateToShow
      ? new Date(startSelectionDateToShow).toDateString()
      : "",
      endSelectionDateToShow : endSelectionDateToShow
      ? new Date(endSelectionDateToShow).toDateString()
      : ""
    },
  };
};

export default useDatePicker;
