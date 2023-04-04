/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:37
 */

import React from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectLastSpending } from "../redux/analyticsSlice";
import { Tooltip } from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";
import "moment/locale/pl";

const Header: React.FC = () => {
  const lastSpending = useSelector(selectLastSpending);

  /**
   * This method is used to
   * return difference between
   * current and last month
   */

  const calculateDiff = (): number => {
    const current: number =
      (lastSpending?.selected?.incomes?._sum?.value ?? 0) -
      (lastSpending?.selected?.outcomes?._sum?.value ?? 0);
    const last: number =
      (lastSpending?.previous?.incomes?._sum?.value ?? 0) -
      (lastSpending?.previous?.outcomes?._sum?.value ?? 0);

    return current - last;
  };

  return (
    <div className={"w-full rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-sm"}>Saldo miesiąca</div>
        <Tooltip label={"Twoje przychody minus wydatki"} placement={"right"}>
          <div>
            <BsInfoCircle />
          </div>
        </Tooltip>
      </div>

      <div className={"mt-1 flex flex-wrap items-center gap-3"}>
        <div className={"text-2xl font-bold text-w"}>
          {(lastSpending?.selected?.incomes?._sum?.value ?? 0) -
            (lastSpending?.selected?.outcomes?._sum?.value ?? 0)}{" "}
          PLN
        </div>
        <div
          className={
            "rounded bg-slate-300 py-1 px-3 text-xs font-bold text-slate-700"
          }
        >
          {calculateDiff() >= 0 ? "+" : "-"} {Math.abs(calculateDiff())} PLN
        </div>
      </div>

      <div className={"mt-1 text-sm text-w-darker"}>
        1 - {moment().format("DD MMMM YYYY")}
      </div>
    </div>
  );
};

export default Header;
