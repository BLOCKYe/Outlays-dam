import React, { useEffect, useRef, useState } from "react";
import { HiCalculator } from "react-icons/hi";
import Badge from "../../../common/components/labels/Badge";
import Input from "../../../common/components/inputs/Input";
import Button from "../../../common/components/buttons/Button";

interface ISavingCalculatorProps {
  lastMonthSavings: number;
}

/**
 *
 * @param index
 */
const getMonthText = (index: number): React.ReactNode => {
  if (index === 1)
    return (
      <span>
        Po{" "}
        <span
          className={"rounded border-[1px] border-d-lighter bg-d-light px-1"}
        >
          1
        </span>{" "}
        miesiącu
      </span>
    );

  if (index > 12)
    return (
      <span>
        Po{" "}
        <span
          className={"rounded border-[1px] border-d-lighter bg-d-light px-1"}
        >
          {index / 12}
        </span>{" "}
        latach
      </span>
    );

  return (
    <span>
      Po{" "}
      <span className={"rounded border-[1px] border-d-lighter bg-d-light px-1"}>
        {index}
      </span>{" "}
      miesiącach
    </span>
  );
};

const SavingCalculator: React.FC<ISavingCalculatorProps> = (props) => {
  const [relativeSavings, setRelativeSavings] = useState<number>(
    props.lastMonthSavings
  );

  useEffect(() => {
    setRelativeSavings(props.lastMonthSavings);
  }, [props.lastMonthSavings]);

  return (
    <div className={"rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center justify-between gap-3"}>
        {/* <--- Header ---> */}
        <>
          <div className={"flex items-center gap-2 text-lg font-bold"}>
            <HiCalculator />
            Symulator
          </div>
        </>
      </div>

      <div className={"mt-3 text-sm text-w-darker"}>
        <p>Prosty symulator pozwalający trend zarządzania pieniędzmi.</p>
        <p>✨ W tym miejscu możesz zasymulować swój trend oszczędnościowy.</p>
      </div>

      {/* <--- Input with custom value ---> */}
      <div className={"mt-5"}>
        <div className={"flex flex-wrap items-center gap-3"}>
          <p>W ostatnich miesiącach zaoszczędzono:</p>

          <div className={"flex gap-3"}>
            <Input
              type={"number"}
              value={relativeSavings}
              onChange={(event) =>
                setRelativeSavings(parseInt(event.target.value))
              }
            />
            <Button
              variant={"CONTAINED"}
              text={"Resetuj"}
              onClick={() => setRelativeSavings(props.lastMonthSavings)}
            />
          </div>
        </div>

        {/* <--- Render upcoming months ---> */}
        <p className={"mt-5"}>
          Utrzymując ten trend oszczędzania, w przyszłości zaoszczędzisz:
        </p>

        <div className={"mt-5 grid gap-3 lg:grid-cols-2"}>
          {[...Array(12).keys(), 23, 35, 59, 119].map((index: number) => (
            <div className={"flex flex-wrap items-center gap-3"} key={index}>
              <Badge
                text={(relativeSavings * (index + 1)).toLocaleString() + " PLN"}
              />
              <p className={"text-xs"}>{getMonthText(index + 1)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavingCalculator;
