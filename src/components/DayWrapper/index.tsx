import React from "react";

type DayWrapperProps = {
  dayNum: number | null;
  initialDate: Date;
  selectedYear: number;
  selectedMonth: number;
  selectedDate: number;
  startSelectedDate: Date | null;
  endSelectedDate: Date | null;
  onClick?: () => void;
  className?: string;
  render: (props: any) => React.ReactElement;
};

const DayWrapper = ({
  dayNum,
  initialDate,
  selectedYear,
  selectedMonth,
  selectedDate,
  startSelectedDate,
  endSelectedDate,
  onClick = () => {},
  className = "",
  render = () => <></>,
}: DayWrapperProps) => {
  if (dayNum === null) return render({ dayNum, className, isDisabled: true });
  const isDisabled =
    selectedMonth === initialDate.getMonth() && initialDate.getDate() > dayNum;

  const isPrevious =
    new Date(selectedYear, selectedMonth, dayNum).getTime() <
    new Date(
      initialDate.getFullYear(),
      initialDate.getMonth(),
      initialDate.getDate()
    ).getTime();

  const isSelected =
    (startSelectedDate?.getDate() === dayNum &&
      selectedMonth === startSelectedDate?.getMonth() && selectedYear === startSelectedDate?.getFullYear()) ||
    (endSelectedDate?.getDate() === dayNum &&
      selectedMonth === endSelectedDate?.getMonth() && selectedYear === endSelectedDate?.getFullYear());

  const isCurrentDay =
    selectedYear === initialDate.getFullYear() &&
    selectedMonth === initialDate.getMonth() &&
    initialDate.getDate() === dayNum;

  const startSelectedDateTimesTamp = startSelectedDate
    ? (startSelectedDate as Date).getTime()
    : "";
  const endSelectedDateTimesTamp = endSelectedDate
    ? (endSelectedDate as Date).getTime()
    : "";

  const isInSelectedRange =
    Boolean(startSelectedDateTimesTamp) &&
    Boolean(endSelectedDateTimesTamp) &&
    new Date(selectedYear, selectedMonth, dayNum).getTime() >
      Math.min(
        startSelectedDateTimesTamp as number,
        endSelectedDateTimesTamp as number
      ) &&
    new Date(selectedYear, selectedMonth, dayNum).getTime() <
      Math.max(
        startSelectedDateTimesTamp as number,
        endSelectedDateTimesTamp as number
      );

  return render({
    dayNum,
    isDisabled,
    isPrevious,
    isSelected,
    isCurrentDay,
    isInSelectedRange,
    className,
    onClick,
  });
};

export default DayWrapper;
