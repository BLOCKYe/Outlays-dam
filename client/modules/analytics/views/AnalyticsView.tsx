/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
 */

import React, { useState } from "react";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import BarChart from "../components/BarChart";
import StatsCard from "../components/StatsCard";
import moment from "moment";
import { GoArrowSmallLeft, GoArrowSmallRight } from "react-icons/go";
import useGetBasicData from "../../../common/hooks/useGetBasicData";
import { selectBasicAnalytics } from "../redux/analyticsSlice";
import {
  fetchBasicAnalytics,
  fetchLastSpending,
} from "../redux/AnalyticsRepository";
import "moment/locale/pl";

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
            value={basicAnalytics.operationsCount}
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
            value={0}
            description={
              "Współczynnik pokazuje stopień oszczędności na podstawie ostatnich miesięcy"
            }
          />
          <StatsCard
            title={"Ograniczonych wydatków"}
            value={0}
            description={
              "Ilość zaoszczędzonych pieniędzy na podstawie średniej z ostatnich miesięcy"
            }
          />
        </div>

        <div className={"mt-3 mb-20 grid gap-3 lg:grid-cols-2"}>
          <BarChart
            title={"Podział wydatków na kategorie"}
            description={
              "Wykres przedstawia rozkład wydatków z podziałem na kategorie."
            }
            data={basicAnalytics.categories}
          />
          <BarChart
            title={"Podział wydatków na miesiące"}
            description={
              "Wykres przedstawia wydatki z podziałem na ostatnie 12 miesięcy."
            }
            data={basicAnalytics.expenses}
          />
          <BarChart
            title={"Podział przychodów na miesiące"}
            description={
              "Wykres przedstawia przychody z podziałem na ostatnie 12 miesięcy."
            }
            data={basicAnalytics.incomes}
          />
        </div>
      </MainWrapper>
      <BottomBar selected={"STATS"} />
    </>
  );
};

export default AnalyticsView;
