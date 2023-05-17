import useDatePicker from "../../hooks/useDatePicker";
import Day from "../Day";
import DayWrapper from "../DayWrapper";

import s from "./index.module.scss";

type DatePickerProps = {
  isSelectionRange?: boolean;
  type?: "russian" | "english";
};

const DatePicker = ({
  isSelectionRange = false,
  type = "russian",
}: DatePickerProps) => {
  const initialDate = new Date();
  const { state, handlers, optionsDate, dateToShow } = useDatePicker(
    initialDate,
    isSelectionRange,
    type
  );

  const startSelectionDate = state.startSelectedDate
    ? state.startSelectedDate.getTime()
    : 0;
  const endSelectionDate = state.endSelectedDate
    ? state.endSelectedDate.getTime()
    : 0;

  const startSelectionDateToShow =
    startSelectionDate && endSelectionDate
      ? Math.min(startSelectionDate, endSelectionDate)
      : startSelectionDate;
  const endSelectionDateToShow =
    startSelectionDate && endSelectionDate
      ? Math.max(startSelectionDate, endSelectionDate)
      : endSelectionDate;

  return (
    <div className={s["datepicker"]}>
      <div>
        Start:{" "}
        {startSelectionDateToShow
          ? new Date(startSelectionDateToShow).toDateString()
          : ""}
      </div>
      <div>
        End:{" "}
        {endSelectionDateToShow
          ? new Date(endSelectionDateToShow).toDateString()
          : ""}
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
          value={state.selectedDate}
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
            return (
              <DayWrapper
                key={`${day}__${index}`}
                dayNum={day}
                initialDate={initialDate}
                selectedYear={state.selectedYear}
                selectedMonth={state.selectedMonth}
                selectedDate={state.selectedDate}
                startSelectedDate={state.startSelectedDate}
                endSelectedDate={state.endSelectedDate}
                onClick={() => handlers.handleSetDay(day as number)}
                render={(props) => <Day {...props} />}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DatePicker;
