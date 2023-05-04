import s from "./index.module.scss";

type DayProps = {
  dayNum: number | null;
  isDisabled?: boolean;
  isSelected?: boolean;
  isPrevious?: boolean;
  isInSelectedRange?: boolean;
  isCurrentDay?: boolean;
  className?: string;
  onClick?: () => void;
};

const Day = ({
  dayNum = 1,
  isDisabled = false,
  isSelected = false,
  isPrevious = false,
  isInSelectedRange = false,
  isCurrentDay = false,
  className = "",
  onClick = () => {},
}: DayProps) => {
  if (dayNum === null) {
    return (
      <li
        className={
          s["day"] +
          (isDisabled ? " " + s["day--disabled"] : "") +
          (className ? " " + className : "")
        }
      >
        {""}
      </li>
    );
  }
  return (
    <li
      className={
        s["day"] +
        (isCurrentDay ? " " + s["day--current-day"] : "") +
        (isDisabled ? " " + s["day--disabled"] : "") +
        (isPrevious ? " " + s["day--prev-days"] : "") +
        (isSelected ? " " + s["day--selected-day"] : "") +
        (className ? " " + className : "")
      }
      onClick={onClick}
    >
      {dayNum}
    </li>
  );
};

export default Day;
