import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setLoading } from "../redux/UISlice";
import {
  fetchBasicAnalytics,
  fetchLastSpending,
} from "../../modules/analytics/redux/AnalyticsRepository";
import { fetchOperations } from "../../modules/operations/redux/OperationsRepository";
import { fetchCategories } from "../../modules/categories/redux/CategoriesRepository";
import { fetchGoals } from "../../modules/goals/redux/GoalsRepository";

function useGetBasicData() {
  const dispatch: any = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(setLoading(true));

      const promises = [
        dispatch(fetchLastSpending({ date: new Date() })),
        dispatch(fetchBasicAnalytics({ date: new Date() })),
        dispatch(fetchOperations()),
        dispatch(fetchGoals()),
        dispatch(fetchCategories()),
      ];

      await Promise.all(promises);
      await dispatch(setLoading(false));
    };

    fetchData().then();
  }, [dispatch]);
}

export default useGetBasicData;
