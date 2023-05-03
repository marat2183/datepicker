import useDatePicker from "../../hooks/useDatePicker";

import s from "./index.module.scss";

const DatePicker: React.FC = () => {
  const initialDate = new Date();
  const {
    daysArrayToShow,
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
    selectedDate,
    yearsRange,
    monthsRange,
    daysRange,
    daysOfWeekRange
  } = useDatePicker(initialDate);

  return (
    <div className={s["datepicker"]}>
      <div>{selectedDate.toDateString()}</div>
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
          value={currentYear}
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
          value={currentMonth}
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
          value={currentDay}
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
            if (day === null) {
              return (
                <li
                  key={`${day}__${index}`}
                  className={
                    s["datepicker__days-list-item"] +
                    " " +
                    s["datepicker__days-list-item--day-number"] +
                    " " +
                    s["datepicker__days-list-item--disabled"]
                  }
                >
                  {""}
                </li>
              );
            } else {
              return (
                <li
                  key={`${day}__${index}`}
                  className={
                    s["datepicker__days-list-item"] +
                    " " +
                    s["datepicker__days-list-item--day-number"] +
                    " " +
                    (currentMonth === initialDate.getMonth() &&
                    initialDate.getDate() === day + 1
                      ? " " + s["datepicker__days-list-item--current-day"]
                      : "") +
                    (currentMonth === initialDate.getMonth() &&
                    initialDate.getDate() > day + 1
                      ? " " + s["datepicker__days-list-item--prev-days"]
                      : "") +
                    (
                    currentDay === day + 1
                      ? " " + s["datepicker__days-list-item--selected-day"]
                      : "")
                  }
                  onClick={() => handleSetDay(day + 1)}
                >
                  {day + 1}
                </li>
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
