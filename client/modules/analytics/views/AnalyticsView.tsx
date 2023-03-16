/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
 */

import React, { useEffect, useState } from "react";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../components/BarChart";
import StatsCard from "../components/StatsCard";
import moment from "moment";
import { GoArrowSmallRight, GoArrowSmallLeft } from "react-icons/go";
import useGetBasicData from "../../../common/hooks/useGetBasicData";
import {
  selectBasicAnalytics,
  selectLastSpending,
} from "../redux/analyticsSlice";
import {
  fetchBasicAnalytics,
  fetchLastSpending,
} from "../redux/AnalyticsRepository";

interface ICurrentDate {
  month: string;
  year: string;
  date: Date;
}

const getFormattedCurrentDate = (date = new Date()): ICurrentDate => {
  const nowMonthAsString = moment(date).format("MMMM");
  const nowYearAsString = moment(date).format("YYYY");

  return { month: nowMonthAsString, year: nowYearAsString, date: date };
};

const AnalyticsView = () => {
  const lastSpending = useSelector(selectLastSpending);
  const basicAnalytics = useSelector(selectBasicAnalytics);
  const dispatch: any = useDispatch();
  useGetBasicData();

  const [currentDate, setCurrentDate] = useState<ICurrentDate>(
    getFormattedCurrentDate()
  );

  /**
   * This method is used to set
   * current date to next one
   */
  const setNextMonth = (): void => {
    const current = currentDate.date;
    const next = moment(current).add(1, "month").toDate();

    setCurrentDate(getFormattedCurrentDate(next));
    dispatch(fetchLastSpending({ date: next }));
    dispatch(fetchBasicAnalytics({ date: next }));
  };

  /**
   * This method is used to
   * set current date to previous one
   */
  const setPreviousMonth = (): void => {
    const current = currentDate.date;
    const previous = moment(current).subtract(1, "month").toDate();

    setCurrentDate(getFormattedCurrentDate(previous));
    dispatch(fetchLastSpending({ date: previous }));
    dispatch(fetchBasicAnalytics({ date: previous }));
  };

  /**
   * Calculate diff between current and last month
   */
  const calculateDiff = (): number => {
    const current: number = lastSpending?.current?._sum?.value || 0;
    const last: number = lastSpending?.last?._sum?.value || 0;

    return current - last;
  };

  /**
   * Calculate percentage diff between current and last month
   */
  const calculatePercentageDiff = (): number => {
    const current: number = lastSpending?.current?._sum?.value || 0;
    const last: number = lastSpending?.last?._sum?.value || 0;

    if (current === 0 || last === 0) return 0;

    return (current / last) * 100;
  };

  return (
    <>
      <TopBar />
      <MainWrapper>
        <div
          className={
            "mt-3 flex items-center gap-3 rounded-md border-[1px] border-d-lighter bg-d p-5 text-3xl font-bold"
          }
        >
          <GoArrowSmallLeft
            onClick={() => setPreviousMonth()}
            className={
              "box-content cursor-pointer rounded-full p-1 transition-all hover:bg-d-lighter"
            }
          />
          <span>
            {currentDate.month} {currentDate.year}{" "}
          </span>
          <GoArrowSmallRight
            onClick={() => setNextMonth()}
            className={
              "box-content cursor-pointer rounded-full p-1 transition-all hover:bg-d-lighter"
            }
          />
        </div>

        <div className={"mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"}>
          <StatsCard
            title={"Wykonanych akcji"}
            value={lastSpending?.currentCount ?? 0}
            description={
              "Liczba wszystkich akcji wykonanych przez ciebie w tym miesiącu."
            }
          />
          <StatsCard
            title={"Wypełnionych celów"}
            value={"0"}
            description={
              "Ilość założonych celów jakie udało ci się wypełnić w tym miesiącu, gratulacje!"
            }
          />
          <StatsCard
            title={"Współczynnik oszczędności"}
            value={`${calculateDiff() <= 0 ? "+" : "-"} ${Math.abs(
              calculatePercentageDiff()
            ).toFixed(2)} %`}
            description={
              "Współczynnik pokazuje stopień oszczędności na podstawie ostatnich miesięcy"
            }
          />
          <StatsCard
            title={"Ograniczonych wydatków"}
            value={`${calculateDiff() <= 0 ? "+" : "-"} ${Math.abs(
              calculateDiff()
            )} PLN`}
            description={
              "Ilość zaoszczędzonych pieniędzy na podstawie średniej z ostatnich miesięcy"
            }
          />
        </div>

        <div className={"mt-3 mb-20 grid gap-3 lg:grid-cols-2"}>
          <BarChart
            title={"Wydatki na postawie kategorii"}
            data={basicAnalytics.categories}
          />
          <BarChart title={"Roczne wydatki"} data={basicAnalytics.lastMonths} />
        </div>
      </MainWrapper>
      <BottomBar selected={"STATS"} />
    </>
  );
};

export default AnalyticsView;
