import useDatePicker from "../../hooks/useDatePicker";
import { months, daysOfWeek } from "../../utils/constants";

import s from "./index.module.scss";


const arrayRange = (start : number, stop: number, step: number) : Array<number> =>
    Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step
    );

const DatePicker: React.FC = () => {
  const initialDate = new Date();
  const {
    daysArray,
    currentDay,
    currentMonth,
    currentYear,
    handleSetYear,
    handleSetMonth,
    handleSetDay,
    handleClickNextMonth,
    handleClickPrevMonth,
    handleClickNextYear,
    handleClickPrevYear,
    handleClickNextDay,
    handleClickPrevDay,
    dateToShow,
    yearsArrayRange,
    daysArrayRange
  } = useDatePicker(initialDate);

 
  return (
    <div className={s["datepicker"]}>
      <div>{dateToShow.toDateString()}</div>
      <div className={s["datepicker__year"]}>
        <button
          className={s["datepicker__year-btn"]}
          onClick={handleClickPrevYear}
        >
          Prev
        </button>
        <select name="year" id="" value={currentYear} onChange={(e : React.ChangeEvent<HTMLSelectElement>) => handleSetYear(e.target.value)}>
          {
            yearsArrayRange.map((year, index) => {
              return <option key={`${year}__${index}`} value={year}>{year}</option>
            })
          }
          
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
        <select name="month" id="" value={currentMonth} onChange={(e : React.ChangeEvent<HTMLSelectElement>) => handleSetMonth(e.target.value)}>
          {
            months.map((month, index) => {
              return <option key={`${month}__${index}`} value={index}>{month}</option>
            })
          }
          
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
        <select name="day" id="" value={currentDay} onChange={(e : React.ChangeEvent<HTMLSelectElement>) => handleSetDay(e.target.value)}>
          {
            daysArrayRange.map((day, index) => {
              return <option key={`${day}__${index}`} value={day}>{day}</option>
            })
          }
          
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
          {daysOfWeek.map((day, index) => {
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
          {daysArray.map((day, index) => {
            return (
              <li
                key={`${day}__${index}`}
                className={
                  s["datepicker__days-list-item"] +
                  " " +
                  s["datepicker__days-list-item--day-number"] +
                  (day === null 
                      ? " " + s["datepicker__days-list-item--disabled"]
                      : "")
                  +
                  (day !== null &&
                  currentMonth === initialDate.getMonth() &&
                  currentDay === day + 1
                    ? " " + s["datepicker__days-list-item--current-day"]
                    : "")
                    +
                    (day !== null &&
                      currentMonth === initialDate.getMonth() &&
                      currentDay > day + 1
                        ? " " + s["datepicker__days-list-item--prev-days"]
                        : "")
                }
              >
                {day !== null ? day + 1 : ""}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
