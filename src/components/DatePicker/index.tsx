import useDatePicker from "../../hooks/useDatePicker";
import Day from "../Day";
import DayWrapper from "../DayWrapper";
import ControllersWrapper from "../ControllersWrapper";
import DayController from "../DayController";
import MonthController from "../MonthController";
import YearController from "../YearController";

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
  const { state, handlers, optionsDate, dataToShow } = useDatePicker(
    initialDate,
    isSelectionRange,
    type
  );

  return (
    <div className={s["datepicker"]}>
      <div>Start: {dataToShow.startSelectionDateToShow}</div>
      <div>End: {dataToShow.endSelectionDateToShow}</div>
      <ControllersWrapper
        handleClickPrev={handlers.handleClickPrevYear}
        handleClickNext={handlers.handleClickNextYear}
        handleSet={handlers.handleSetYear}
        value={state.selectedYear}
        options={optionsDate.yearsRange}
        render={(props) => <YearController {...props} />}
      />
      <ControllersWrapper
        handleClickPrev={handlers.handleClickPrevMonth}
        handleClickNext={handlers.handleClickNextMonth}
        handleSet={handlers.handleSetMonth}
        value={state.selectedMonth}
        options={optionsDate.monthsRange}
        render={(props) => <MonthController {...props} />}
      />
      <ControllersWrapper
        handleClickPrev={handlers.handleClickPrevDay}
        handleClickNext={handlers.handleClickNextDay}
        handleSet={handlers.handleSetDay}
        value={state.selectedDate}
        options={optionsDate.daysRange}
        render={(props) => <DayController {...props} />}
      />
      <div className={s["datepicker__month-table"]}>
        <ul className={s["datepicker__days-list"]}>
          {dataToShow.daysOfWeekToShow.map((day, index) => {
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
          {dataToShow.daysArrayToShow.map((day, index) => {
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
