import useDatePicker from "../../hooks/useDatePicker";
import Day from "../Day";

import s from "./index.module.scss";

const DatePicker: React.FC = () => {
  const initialDate = new Date();
  const {
    daysArrayToShow,
    selectedDay,
    selectedMonth,
    selectedYear,
    handleSetYear,
    handleSetMonth,
    handleSetDay,
    handleClickNextMonth,
    handleClickPrevMonth,
    handleClickNextYear,
    handleClickPrevYear,
    handleClickNextDay,
    handleClickPrevDay,
    startSelectedDate,
    endSelectedDate,
    yearsRange,
    monthsRange,
    daysRange,
    daysOfWeekRange,
  } = useDatePicker(initialDate);

  const startSelectedDateTimesTamp = startSelectedDate && (startSelectedDate as Date).getTime();
  const endSelectedDateTimesTamp = endSelectedDate && (endSelectedDate as Date).getTime()


  return (
    <div className={s["datepicker"]}>
      <div>
        Start: {startSelectedDate ? startSelectedDate.toDateString() : ""}
      </div>
      <div>End: {endSelectedDate ? endSelectedDate.toDateString() : ""}</div>
      <div className={s["datepicker__year"]}>
        <button
          className={s["datepicker__year-btn"]}
          onClick={handleClickPrevYear}
        >
          Prev
        </button>
        <select
          name="year"
          id=""
          value={selectedYear}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSetYear(e.target.value)
          }
        >
          {yearsRange.map((year, index) => {
            return (
              <option key={`${year}__${index}`} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__year-btn"]}
          onClick={handleClickNextYear}
        >
          Next
        </button>
      </div>
      <div className={s["datepicker__month"]}>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handleClickPrevMonth}
        >
          Prev
        </button>
        <select
          name="month"
          id=""
          value={selectedMonth}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSetMonth(e.target.value)
          }
        >
          {monthsRange.map((month, index) => {
            return (
              <option key={`${month}__${index}`} value={index}>
                {month}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handleClickNextMonth}
        >
          Next
        </button>
      </div>
      <div className={s["datepicker__day"]}>
        <button
          className={s["datepicker__day-btn"]}
          onClick={handleClickPrevDay}
        >
          Prev
        </button>
        <select
          name="day"
          id=""
          value={selectedDay}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSetDay(e.target.value)
          }
        >
          {daysRange.map((day, index) => {
            return (
              <option key={`${day}__${index}`} value={day}>
                {day}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handleClickNextDay}
        >
          Next
        </button>
      </div>
      <div className={s["datepicker__month-table"]}>
        <ul className={s["datepicker__days-list"]}>
          {daysOfWeekRange.map((day, index) => {
            return (
              <li
                key={`${day}__${index}`}
                className={
                  s["datepicker__days-list-item"] +
                  " " +
                  s["datepicker__days-list-item--day-name"]
                }
              >
                {day}
              </li>
            );
          })}
          {daysArrayToShow.map((day, index) => {
            if (day !== null) {
              return (
                <Day
                  dayNum={day}
                  key={`${day}__${index}`}
                  isDisabled={
                    selectedMonth === initialDate.getMonth() &&
                    initialDate.getDate() > day
                  }
                  isPrevious={
                    selectedMonth === initialDate.getMonth() &&
                    initialDate.getDate() > day
                  }
                  isSelected={
                    (startSelectedDate?.getDate() === day &&
                      selectedMonth === startSelectedDate?.getMonth()) ||
                    (endSelectedDate?.getDate() === day &&
                      selectedMonth === endSelectedDate?.getMonth())
                  }
                  isCurrentDay={
                    selectedMonth === initialDate.getMonth() &&
                    initialDate.getDate() === day
                  }
                  isInSelectedRange={
                    Boolean(startSelectedDateTimesTamp) &&
                    Boolean(endSelectedDateTimesTamp) &&
                    new Date(selectedYear, selectedMonth, day).getTime() >
                      Math.min(startSelectedDateTimesTamp as number, endSelectedDateTimesTamp as number) &&
                    new Date(selectedYear, selectedMonth, day).getTime() <
                      Math.max(startSelectedDateTimesTamp as number, endSelectedDateTimesTamp as number)
                  }
                  onClick={() => handleSetDay(day)}
                />
              );
            }
            return (
              <Day dayNum={day} key={`${day}__${index}`} isDisabled={true} />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
