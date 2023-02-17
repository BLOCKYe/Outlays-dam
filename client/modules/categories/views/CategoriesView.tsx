/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 26.08.2022
 * Time: 22:01
 */

import React, { useEffect } from "react";
import MainWrapper from "../../../common/components/dashboard/MainWrapper";
import TopBar from "../../../common/components/menu/TopBar";
import BottomBar from "../../../common/components/menu/BottomBar";
import CategoriesList from "../components/CategoriesList";
import AddCategoryButton from "../components/AddCategoryButton";
import { fetchCategories } from "../redux/CategoriesRepository";
import { useDispatch } from "react-redux";
import { setLoading } from "../../../common/redux/UISlice";
import AddOutlayButton from "../../outlays/components/AddOutlayButton";
import { fetchLastSpending } from "../../analytics/redux/AnalyticsRepository";
import { fetchOutlays } from "../../outlays/redux/OutlaysRepository";

const CategoriesView = () => {
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setLoading(true));

      const promises = [
        dispatch(fetchLastSpending()),
        dispatch(fetchOutlays()),
        dispatch(fetchCategories()),
      ];

      await Promise.all(promises);
      await dispatch(setLoading(false));
    };

    fetchData().then();
  }, [dispatch]);

  return (
    <>
      <TopBar />
      <MainWrapper>
        <div className={"flex flex-wrap gap-3 sm:flex-nowrap"}>
          <AddCategoryButton text={"Nowa kategoria"} />
          <AddOutlayButton text={"Nowy wydatek"} />
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
