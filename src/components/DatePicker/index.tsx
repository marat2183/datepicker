import useDatePicker from "../../hooks/useDatePicker";
import Day from "../Day";

import s from "./index.module.scss";

const DatePicker = () => {
  const initialDate = new Date();
  const { state, handlers, optionsDate, dateToShow } =
    useDatePicker(initialDate);

  const startSelectedDateTimesTamp =
    state.startSelectedDate ? (state.startSelectedDate as Date).getTime() : "";
  const endSelectedDateTimesTamp =
    state.endSelectedDate ? (state.endSelectedDate as Date).getTime() : "";
  
  return (
    <div className={s["datepicker"]}>
      <div>
        Start:{" "}
        {state.startSelectedDate ? state.startSelectedDate.toDateString() : ""}
      </div>
      <div>
        End: {state.endSelectedDate ? state.endSelectedDate.toDateString() : ""}
      </div>
      <div className={s["datepicker__year"]}>
        <button
          className={s["datepicker__year-btn"]}
          onClick={handlers.handleClickPrevYear}
        >
          Prev
        </button>
        <select
          name="year"
          id=""
          value={state.selectedYear}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handlers.handleSetYear(e.target.value)
          }
        >
          {optionsDate.yearsRange.map((year, index) => {
            return (
              <option key={`${year}__${index}`} value={year}>
                {year}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__year-btn"]}
          onClick={handlers.handleClickNextYear}
        >
          Next
        </button>
      </div>
      <div className={s["datepicker__month"]}>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handlers.handleClickPrevMonth}
        >
          Prev
        </button>
        <select
          name="month"
          id=""
          value={state.selectedMonth}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handlers.handleSetMonth(e.target.value)
          }
        >
          {optionsDate.monthsRange.map((month, index) => {
            return (
              <option key={`${month}__${index}`} value={index}>
                {month}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handlers.handleClickNextMonth}
        >
          Next
        </button>
      </div>
      <div className={s["datepicker__day"]}>
        <button
          className={s["datepicker__day-btn"]}
          onClick={handlers.handleClickPrevDay}
        >
          Prev
        </button>
        <select
          name="day"
          id=""
          value={state.selectedDay}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handlers.handleSetDay(e.target.value)
          }
        >
          {optionsDate.daysRange.map((day, index) => {
            return (
              <option key={`${day}__${index}`} value={day}>
                {day}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handlers.handleClickNextDay}
        >
          Next
        </button>
      </div>
      <div className={s["datepicker__month-table"]}>
        <ul className={s["datepicker__days-list"]}>
          {dateToShow.daysOfWeekToShow.map((day, index) => {
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
          {dateToShow.daysArrayToShow.map((day, index) => {
            if (day !== null) {
              return (
                <Day
                  dayNum={day}
                  key={`${day}__${index}`}
                  isDisabled={
                    state.selectedMonth === initialDate.getMonth() &&
                    initialDate.getDate() > day
                  }
                  isPrevious={
                    new Date(
                      state.selectedYear,
                      state.selectedMonth,
                      day
                    ).getTime() <
                    new Date(
                      initialDate.getFullYear(),
                      initialDate.getMonth(),
                      initialDate.getDate()
                    ).getTime()
                  }
                  isSelected={
                    (state.startSelectedDate?.getDate() === day &&
                      state.selectedMonth ===
                        state.startSelectedDate?.getMonth()) ||
                    (state.endSelectedDate?.getDate() === day &&
                      state.selectedMonth === state.endSelectedDate?.getMonth())
                  }
                  isCurrentDay={
                    state.selectedMonth === initialDate.getMonth() &&
                    initialDate.getDate() === day
                  }
                  isInSelectedRange={
                    Boolean(startSelectedDateTimesTamp) &&
                    Boolean(endSelectedDateTimesTamp) &&
                    new Date(
                      state.selectedYear,
                      state.selectedMonth,
                      day
                    ).getTime() >
                      Math.min(
                        startSelectedDateTimesTamp as number,
                        endSelectedDateTimesTamp as number
                      ) &&
                    new Date(
                      state.selectedYear,
                      state.selectedMonth,
                      day
                    ).getTime() <
                      Math.max(
                        startSelectedDateTimesTamp as number,
                        endSelectedDateTimesTamp as number
                      )
                  }
                  onClick={() => handlers.handleSetDay(day)}
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
