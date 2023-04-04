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
import CategoriesList from "../components/CategoriesList";
import AddCategoryButton from "../components/AddCategoryButton";
import AddOutlayButton from "../../outlays/components/AddOutlayButton";
import AddGoalButton from "../../goals/components/AddGoalButton";
import useGetBasicData from "../../../common/hooks/useGetBasicData";

const CategoriesView = () => {
  useGetBasicData();

  return (
    <>
      <TopBar />
      <MainWrapper>
        <div className={"flex flex-wrap gap-3 sm:flex-nowrap"}>
          <AddCategoryButton text={"Nowa kategoria"} />
          <AddOutlayButton text={"Nowa operacja"} />
          <AddGoalButton text={"Nowy cel"} />
        </div>

        <div className={"pt-3"}>
          <CategoriesList />
        </div>
      </MainWrapper>
      <BottomBar selected={"CATEGORIES"} />
    </>
  );
};

export default CategoriesView;
