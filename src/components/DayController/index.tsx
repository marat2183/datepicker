import React from 'react'
import s from './index.module.scss'

type DayControllerProps = {
  handleClickPrev : () => void
  handleClickNext: () => void
  handleSet: (value: string) => void
  value: string
  options: Array<string>
}

const DayController = ({handleClickPrev = () => {}, handleClickNext = () => {}, handleSet = () => {}, value = "", options = [] } : DayControllerProps) =>  {
  return (
    <div className={s["datepicker__day"]}>
        <button
          className={s["datepicker__day-btn"]}
          onClick={handleClickPrev}
        >
          Prev
        </button>
        <select
          name="day"
          id=""
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSet(e.target.value)
          }
        >
          {options.map((day, index) => {
            return (
              <option key={`${day}__${index}`} value={day}>
                {day}
              </option>
            );
          })}
        </select>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
  )
}

export default DayController;