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
import BottomBar from "../../../common/components/menu/BottomBar";
import AddOperationButton from "../../operations/components/AddOperationButton";
import AddCategoryButton from "../../categories/components/AddCategoryButton";
import AddGoalButton from "../components/AddGoalButton";
import GoalsList from "../components/GoalsList";
import useGetBasicData from "../../../common/hooks/useGetBasicData";

const GoalsView = () => {
  useGetBasicData();

  return (
    <>
      <TopBar />
      <MainWrapper>
        <div className={"flex flex-wrap gap-3 sm:flex-nowrap"}>
          <AddGoalButton text={"Nowy cel"} />
          <AddOperationButton text={"Nowa operacja"} />
          <AddCategoryButton text={"Nowa kategoria"} />
        </div>

        <div className={"pt-3"}>
          <GoalsList />
        </div>
      </MainWrapper>
      <BottomBar selected={"GOALS"} />
    </>
  );
};

export default GoalsView;
