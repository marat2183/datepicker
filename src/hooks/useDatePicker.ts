import { useState, useCallback } from "react";
import helper from "../utils/helpers";
import { months, daysOfWeek } from "../utils/constants";


const useDatePicker = (initialDate: Date = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [currentDay, setCurrentDay] = useState<number>(initialDate.getDay());

  const daysInMonth = helper.getDays(currentYear, currentMonth + 1);
  const dayOfWeekForFirstDay = helper.getMothNumOfFirstDay(
    currentYear,
    currentMonth
  );

  const selectedDate = new Date(currentYear, currentMonth, currentDay);

  const minMonthNum = 0;
  const maxMonthNum = 11;
  const minDayNum = 1;
  const maxDayNum = daysInMonth;
  const minYearNum = 1970;
  const maxYearNum = 2025;

  const daysArrayToShow: Array<null | number> = helper.getDaysToShow(daysInMonth, dayOfWeekForFirstDay);
  const yearsRange: Array<number> = helper.arrayRange(minYearNum, maxYearNum, 1);
  const daysRange: Array<number> = helper.arrayRange(1, daysInMonth, 1);
  const monthsRange: Array<string> = months;
  const daysOfWeekRange: Array<string>  = daysOfWeek

  const handleSetYear = (year: string | number) => {
    return setCurrentYear(Number(year));
  };

  const handleSetMonth = (month: string | number) => {
    return setCurrentMonth(Number(month));
  };

  const handleSetDay = (day: number | string) => {
    return setCurrentDay(Number(day));
  };

  const handleClickPrevMonth = useCallback(() => {
    if (currentMonth === minMonthNum) {
      setCurrentMonth(maxMonthNum);
      setCurrentYear((current) => current - 1);
      return;
    }

    setCurrentMonth((current) => {
      return current - 1;
    });
    return;
  }, [currentMonth]);

  const handleClickNextMonth = useCallback(() => {
    if (currentMonth === maxMonthNum) {
      setCurrentMonth(minMonthNum);
      setCurrentYear((current) => current + 1);
      return;
    }

    setCurrentMonth((current) => current + 1);
    return;
  }, [currentMonth]);

  const handleClickPrevYear = useCallback(() => {
    setCurrentYear((current) => current - 1);
  }, []);

  const handleClickNextYear = useCallback(() => {
    setCurrentYear((current) => current + 1);
  }, []);

  const handleClickNextDay = () => {
    if (currentDay === maxDayNum) {
      setCurrentDay(1);
      handleClickNextMonth();
      return;
    }
    setCurrentDay((current) => current + 1);
    return;
  };

  const handleClickPrevDay = () => {
    if (currentDay === minDayNum) {
      const daysInPrevMonth = helper.getDays(currentYear, currentMonth);
      handleClickPrevMonth();
      setCurrentDay(daysInPrevMonth);
      return;
    }

    setCurrentDay((current) => current - 1);
    return;
  };

  return {
    daysArrayToShow,
    currentDay,
    currentMonth,
    currentYear,
    setCurrentDay,
    setCurrentMonth,
    setCurrentYear,
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
