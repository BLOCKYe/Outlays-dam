/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 28.08.2022
 * Time: 19:37
 */

import React, { useMemo } from "react";
import moment from "moment";
import { useSelector } from "react-redux";
import { selectLastSpending } from "../redux/analyticsSlice";
import { Tooltip } from "@chakra-ui/react";
import { BsInfoCircle } from "react-icons/bs";
import "moment/locale/pl";
import BadgeLight from "../../../common/components/labels/BadgeLight";

const Header: React.FC = () => {
  const lastSpending = useSelector(selectLastSpending);

  /**
   * This method is used to
   * return difference between
   * current and last month
   */
  const calculatedDiff = useMemo(() => {
    const current: number =
      (lastSpending?.selected?.incomes?._sum?.value ?? 0) -
      (lastSpending?.selected?.expenses?._sum?.value ?? 0);
    const last: number =
      (lastSpending?.previous?.incomes?._sum?.value ?? 0) -
      (lastSpending?.previous?.expenses?._sum?.value ?? 0);

    return current - last;
  }, [
    lastSpending?.previous?.expenses?._sum?.value,
    lastSpending?.previous?.incomes?._sum?.value,
    lastSpending?.selected?.expenses?._sum?.value,
    lastSpending?.selected?.incomes?._sum?.value,
  ]);

  /**
   * This function is used to
   * calculate incomes
   */
  const calculatedSavings = useMemo(() => {
    return (
      (lastSpending?.selected?.incomes?._sum?.value ?? 0) -
      (lastSpending?.selected?.expenses?._sum?.value ?? 0)
    );
  }, [
    lastSpending?.selected?.expenses?._sum?.value,
    lastSpending?.selected?.incomes?._sum?.value,
  ]);

  return (
    <div className={"w-full rounded-md border-[1px] border-d-lighter bg-d p-5"}>
      <div className={"flex items-center gap-2"}>
        <div className={"text-sm"}>Ten miesiąc</div>
        <Tooltip
          label={
            "Twoje dochody (przychody minus wydatki). Wartość z ramki odnosi się do poprzedniego miesiąca."
          }
          placement={"right"}
        >
          <div>
            <BsInfoCircle />
          </div>
        </Tooltip>
      </div>

      <div className={"mt-1 flex flex-wrap items-center gap-3"}>
        <div className={"text-2xl font-bold text-w"}>
          {calculatedSavings.toLocaleString()} PLN
        </div>
        <BadgeLight
          text={`${calculatedDiff >= 0 ? "+" : "-"} ${Math.abs(
            calculatedDiff
          ).toLocaleString()} PLN`}
        />
      </div>

      <div className={"mt-1 text-sm text-w-darker"}>
        1 - {moment().format("DD MMMM YYYY")}
      </div>
    </div>
  );
};

export default Header;
