import React from "react";

type ControllersWrapperProps = {
  handleClickPrev: () => void;
  handleClickNext: () => void;
  handleSet: (value: string) => void;
  value: number;
  options: Array<number> | Array<string>;
  render: (props: any) => React.ReactElement;
};

const ControllersWrapper = ({
  handleClickPrev = () => {},
  handleClickNext = () => {},
  handleSet = () => {},
  value = 0,
  options = [],
  render = () => <></>,
}: ControllersWrapperProps) => {
  return render({
    handleClickPrev,
    handleClickNext,
    handleSet,
    value,
    options,
  });
};

export default ControllersWrapper;
