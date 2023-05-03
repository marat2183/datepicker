import { useState } from "react";
import s from "./index.module.scss";
import { months, daysOfWeek } from "../../utils/constants";
import helper from "../../utils/helpers";

const DatePicker: React.FC = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDay = currentDate.getDay();
  const numOfDays = helper.getDays(currentYear, currentMonth + 1);
  const dayOfWeekForFirstDay = helper.getMothNumOfFirstDay(currentYear, currentMonth);


  const daysArray = helper.getDaysToShow(numOfDays, dayOfWeekForFirstDay);
  console.log(daysArray)

  return (
    <div className={s["datepicker"]}>
      <h1 className={s["datepicker__year"]}>
        {currentYear}
      </h1>
      <h1 className={s["datepicker__month"]}>
        <span>{months[currentMonth]}</span>
      </h1>
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
                  (day !== null && currentDay === day + 1
                    ? " " + s["datepicker__days-list-item--current-day"]
                    : "")
                }
              >
                {day !== null ? day + 1 : ''}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
