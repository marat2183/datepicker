import React from 'react'
import s from './index.module.scss'

type MonthControllerProps = {
  handleClickPrev : () => void
  handleClickNext: () => void
  handleSet: (value: string) => void
  value: string
  options: Array<string>
}

const MonthController = ({handleClickPrev = () => {}, handleClickNext = () => {}, handleSet = () => {}, value = "", options = []} : MonthControllerProps) => {
  return (
    <div className={s["datepicker__month"]}>
        <button
          className={s["datepicker__month-btn"]}
          onClick={handleClickPrev}
        >
          Prev
        </button>
        <select
          name="month"
          id=""
          value={value}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleSet(e.target.value)
          }
        >
          {options.map((month, index) => {
            return (
              <option key={`${month}__${index}`} value={index}>
                {month}
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

export default MonthController