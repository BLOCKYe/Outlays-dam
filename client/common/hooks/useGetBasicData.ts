import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "../redux/UISlice";
import {
  fetchBasicAnalytics,
  fetchLastSpending,
} from "../../modules/analytics/redux/AnalyticsRepository";
import { fetchOutlays } from "../../modules/outlays/redux/OutlaysRepository";
import { fetchCategories } from "../../modules/categories/redux/CategoriesRepository";

function useGetBasicData() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setLoading(true));

      const promises = [
        dispatch(fetchLastSpending({ date: new Date() })),
        dispatch(fetchBasicAnalytics({ date: new Date() })),
        dispatch(fetchOutlays()),
        dispatch(fetchCategories()),
      ];

      await Promise.all(promises);
      await dispatch(setLoading(false));
    };

    fetchData().then();
  }, [dispatch]);
}

export default useGetBasicData;
