/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
 */

import React from "react";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import Header from "../../analytics/components/Header";
import AddOperationButton from "../components/AddOperationButton";
import BottomBar from "../../../common/components/menu/BottomBar";
import HistoryList from "../components/HistoryList";
import AddCategoryButton from "../../categories/components/AddCategoryButton";
import AddGoalButton from "../../goals/components/AddGoalButton";
import useGetBasicData from "../../../common/hooks/useGetBasicData";

const HomeView = () => {
  useGetBasicData();

  return (
    <>
      <TopBar />
      <MainWrapper>
        <Header />

        <div className={"flex flex-wrap gap-3 pt-3 sm:flex-nowrap"}>
          <AddOperationButton text={"Nowa operacja"} />
          <AddCategoryButton text={"Nowa kategoria"} />
          <AddGoalButton text={"Nowy cel"} />
        </div>

        <div className={"pt-3"}>
          <HistoryList />
        </div>
      </MainWrapper>
      <BottomBar selected={"HISTORY"} />
    </>
  );
};

export default HomeView;
