/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
 */

import React, { useEffect, useMemo, useState } from "react";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import { useDispatch, useSelector } from "react-redux";
import BarChartVertical from "../components/BarChartVertical";
import StatsCard from "../components/StatsCard";
import moment from "moment";
import { GoArrowSmallLeft, GoArrowSmallRight } from "react-icons/go";
import useGetBasicData from "../../../common/hooks/useGetBasicData";
import { selectBasicAnalytics } from "../redux/analyticsSlice";
import { fetchBasicAnalytics } from "../redux/AnalyticsRepository";
import "moment/locale/pl";
import type { AppDispatch } from "../../../common/redux/store";
import { selectLoading, setLoading } from "../../../common/redux/UISlice";
import { SectionsEnum } from "../../../../common/dashboard/SectionsEnum";
import BarChartHorizontal from "../components/BarChartHorizontal";
import BarChartHorizontalExtra from "../components/BarChartHorizontalExtra";
import SavingCalculator from "../components/SavingCalculator";
import Header from "../components/Header";
import { Skeleton } from "@chakra-ui/react";

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
  const isLoading = useSelector(selectLoading);
  const [localLoading, setLocalLoading] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  useGetBasicData();

  const [currentDate, setCurrentDate] = useState<ICurrentDate>(
    getFormattedCurrentDate()
  );

  /**
   * This method is used to set
   * current date to next one
   */
  const setNextMonth = async (): Promise<void> => {
    if (isLoading) return;

    const current = currentDate.date;
    const next = moment(current).add(1, "month").toDate();

    setCurrentDate(getFormattedCurrentDate(next));
    dispatch(setLoading(true));
    setLocalLoading(true);
    await dispatch(fetchBasicAnalytics({ date: next }));
    dispatch(setLoading(false));
    setLocalLoading(false);
  };

  /**
   * This method is used to
   * set current date to previous one
   */
  const setPreviousMonth = async (): Promise<void> => {
    if (isLoading) return;

    const current = currentDate.date;
    const previous = moment(current).subtract(1, "month").toDate();

    setCurrentDate(getFormattedCurrentDate(previous));
    dispatch(setLoading(true));
    setLocalLoading(true);
    await dispatch(fetchBasicAnalytics({ date: previous }));
    dispatch(setLoading(false));
    setLocalLoading(false);
  };

  useEffect(() => {
    const init = async () => {
      dispatch(setLoading(true));
      setLocalLoading(true);
      await dispatch(fetchBasicAnalytics({ date: new Date() }));
      dispatch(setLoading(false));
      setLocalLoading(false);
    };
    init().then();
  }, [dispatch]);

  /**
   * The difference between last
   * and current month
   */
  const getLimitedExpenses = useMemo(() => {
    const lastMonth =
      (basicAnalytics.incomes[1]?.value ?? 0) -
      (basicAnalytics.expenses[1]?.value ?? 0);

    const currentMonth =
      (basicAnalytics.incomes[0]?.value ?? 0) -
      (basicAnalytics.expenses[0]?.value ?? 0);

    const value = currentMonth - lastMonth;
    const indicator = ((lastMonth || 1) / (currentMonth || 1)) * 100;

    return { value, indicator };
  }, [basicAnalytics.expenses, basicAnalytics.incomes]);

  return (
    <>
      <TopBar />
      <MainWrapper>
        <Header />

        <div
          className={
            "mt-3 flex flex-wrap items-center gap-3 rounded-md border-[1px] border-d-lighter bg-d p-5 text-3xl font-bold"
          }
        >
          <GoArrowSmallLeft
            onClick={() => setPreviousMonth()}
            className={
              "box-content cursor-pointer rounded-full p-1 transition-all hover:bg-d-lighter"
            }
          />
          <GoArrowSmallRight
            onClick={() => setNextMonth()}
            className={
              "box-content cursor-pointer rounded-full p-1 transition-all hover:bg-d-lighter"
            }
          />
          <span>
            {currentDate.month} {currentDate.year}{" "}
          </span>
        </div>

        {/* <--- Quick cards ---> */}
        <div className={"mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"}>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <StatsCard
              title={"Wykonanych akcji"}
              value={basicAnalytics.operationsCount}
              description={
                "Liczba wszystkich akcji wykonanych przez ciebie w tym miesiącu."
              }
            />
          </Skeleton>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <StatsCard
              title={"Wypełnionych celów"}
              value={basicAnalytics.reachedGoalsCount}
              description={
                "Ilość założonych celów jakie udało ci się wypełnić w tym miesiącu, gratulacje!"
              }
            />
          </Skeleton>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <StatsCard
              title={"Współczynnik oszczędności"}
              value={getLimitedExpenses.indicator.toFixed(2)}
              description={
                "Współczynnik pokazuje stopień zaoszczędzonych pieniędzy w odniesieniu do poprzedniego miesiąca."
              }
            />
          </Skeleton>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <StatsCard
              title={"Zaoszczędzono"}
              value={getLimitedExpenses.value.toLocaleString() + " PLN"}
              description={
                "Zaoszczędzonych pieniędzy w odniesieniu do poprzedniego miesiąca."
              }
            />
          </Skeleton>
        </div>

        {/* <--- Charts ---> */}
        <div className={"mt-3 grid gap-3 lg:grid-cols-2"}>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <BarChartVertical
              title={"Wydatki w ostatnich miesiącach"}
              description={
                "Wykres przedstawia wydatki z podziałem na ostatnie 12 miesięcy."
              }
              data={basicAnalytics.expenses}
            />
          </Skeleton>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <BarChartVertical
              title={"Przychody w ostatnich miesiącach"}
              description={
                "Wykres przedstawia przychody z podziałem na ostatnie 12 miesięcy."
              }
              data={basicAnalytics.incomes}
            />
          </Skeleton>

          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <SavingCalculator
              lastMonthSavings={
                (basicAnalytics.incomes[1]?.value ?? 0) -
                (basicAnalytics.expenses[1]?.value ?? 0)
              }
            />
          </Skeleton>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <BarChartHorizontal
              title={"Operacje z podziałem na kategorie"}
              description={
                "Wykres przedstawia rozkład wydatków z podziałem na kategorie."
              }
              data={basicAnalytics.categories}
            />
          </Skeleton>
        </div>

        <div className={"mt-3 mb-20"}>
          <Skeleton startColor="black" endColor="gray" isLoaded={!localLoading}>
            <BarChartHorizontalExtra
              title={"Zestawienie wydatków z przychodami"}
              description={
                "Wykres przedstawia zestawienie wydatków z przychodami z podziałem na ostatnie 6 miesięcy."
              }
              data={basicAnalytics.incomes}
              secondData={basicAnalytics.expenses}
            />
          </Skeleton>
        </div>
      </MainWrapper>
      <BottomBar selected={SectionsEnum.ANALYTICS} />
    </>
  );
};

export default AnalyticsView;
