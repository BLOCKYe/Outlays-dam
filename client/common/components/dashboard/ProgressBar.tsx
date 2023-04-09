import React from "react";

interface IProgressBarProps {
  currentValue: number;
  endValue: number;
}

/**
 *
 * @param currentValue
 * @param endValue
 */
const getPercentage = (currentValue: number, endValue: number): number => {
  const computedValue = (currentValue / endValue) * 100;

  if (computedValue > 100) return 100;
  else return (currentValue / endValue) * 100;
};

const ProgressBar: React.FC<IProgressBarProps> = (props) => {
  return (
    <div>
      {/* <--- render bar ---> */}
      <div className={"relative h-[10px] w-full rounded-xl bg-d-lighter "}>
        <div
          className={
            "absolute top-0 left-0 h-[10px] rounded-xl bg-gradient-to-r from-c to-c-light"
          }
          style={{
            width: `${getPercentage(props.currentValue, props.endValue)}%`,
          }}
        />
      </div>

      {/* <--- render values ---> */}
      <div
        className={
          "mt-1 flex flex-wrap justify-between gap-1 text-xs font-bold"
        }
      >
        <p>{props.currentValue}</p>
        <p>{props.endValue}</p>
      </div>
    </div>
  );
};

export default ProgressBar;
