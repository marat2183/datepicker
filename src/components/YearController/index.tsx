import React from "react";
import s from './index.module.scss'

type YearControllerProps = {
  handleClickPrev : () => void
  handleClickNext: () => void
  handleSet: (value: string) => void
  value: string
  options: Array<string>
}

const YearController = ({handleClickPrev = () => {}, handleClickNext = () => {}, handleSet = () => {}, value = "", options = []} : YearControllerProps) => {
  return (
    <div className={s["datepicker__year"]}>
      <button
        className={s["datepicker__year-btn"]}
        onClick={handleClickPrev}
      >
        Prev
      </button>
      <select
        name="year"
        id=""
        value={value}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          handleSet(e.target.value)
        }
      >
        {options.map((year, index) => {
          return (
            <option key={`${year}__${index}`} value={year}>
              {year}
            </option>
          );
        })}
      </select>
      <button
        className={s["datepicker__year-btn"]}
        onClick={handleClickNext}
      >
        Next
      </button>
    </div>
  );
};

export default YearController;
