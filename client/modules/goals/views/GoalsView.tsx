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

const GoalsView = () => {
  return (
    <>
      <TopBar />
      <MainWrapper>
        <div className={"flex flex-wrap gap-3 sm:flex-nowrap"}>
          <AddOperationButton text={"Nowa operacja"} />
          <AddCategoryButton text={"Nowa kategoria"} />
          <AddGoalButton text={"Nowy cel"} />
        </div>
      </MainWrapper>
      <BottomBar selected={"GOALS"} />
    </>
  );
};

export default GoalsView;
