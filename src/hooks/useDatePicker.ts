import { useState, useCallback } from "react";
import helper from "../utils/helpers";

const arrayRange = (start : number, stop: number, step: number) : Array<number> =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );


const useDatePicker = (initialDate: Date = new Date()) => {
  const [currentMonth, setCurrentMonth] = useState<number>(
    initialDate.getMonth()
  );
  const [currentYear, setCurrentYear] = useState<number>(
    initialDate.getFullYear()
  );
  const [currentDay, setCurrentDay] = useState<number>(initialDate.getDay());

  const numOfDays = helper.getDays(currentYear, currentMonth + 1);
  const dayOfWeekForFirstDay = helper.getMothNumOfFirstDay(
    currentYear,
    currentMonth
  );

  const dateToShow = new Date(currentYear, currentMonth, currentDay);

  const daysArray = helper.getDaysToShow(numOfDays, dayOfWeekForFirstDay);

  const minMonth = 0;
  const maxMonth = 11;
  const minDayNum = 1;
  const maxDayNum = numOfDays;
  const minYear = 1970
  const maxYear = 2025

  const yearsArrayRange = arrayRange(minYear, maxYear, 1)
  const daysArrayRange = arrayRange(1, numOfDays, 1)

  const handleSetYear = (year: string | number) => {
    return setCurrentYear(Number(year))
  }

  const handleSetMonth = (month: string | number) => {
    return setCurrentMonth(Number(month))
  }

  const handleSetDay = (day: number | string) => {
    return setCurrentDay(Number(day))
  }

  const handleClickPrevMonth = useCallback(() => {
    if (currentMonth === minMonth) {
      setCurrentMonth(maxMonth);
      setCurrentYear((current) => current - 1);
      return;
    }

    setCurrentMonth((current) => {
      return current - 1;
    });
    return;
  }, [currentMonth]);

  const handleClickNextMonth = useCallback(() => {
    if (currentMonth === maxMonth) {
      setCurrentMonth(minMonth);
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
  }

  const handleClickPrevDay = () => {
    if (currentDay === minDayNum) {
      const daysInPrevMonth = helper.getDays(currentYear, currentMonth)
      handleClickPrevMonth();
      setCurrentDay(daysInPrevMonth);
      return;
    }

    setCurrentDay((current) => current - 1);
    return;
  }

  return {
    daysArray,
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
    dateToShow,
    yearsArrayRange,
    daysArrayRange
  };
};

export default useDatePicker;
