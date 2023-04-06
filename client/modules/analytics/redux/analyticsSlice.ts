import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../common/redux/store";
import { fetchBasicAnalytics, fetchLastSpending } from "./AnalyticsRepository";
import type { ILastSpendingData } from "./AnalyticsInterfaces";
import type { IBasicAnalyticsOperationMonthData } from "./AnalyticsInterfaces";
import type { IBasicAnalyticsCategoryData } from "./AnalyticsInterfaces";

interface IAnalyticsSlice {
  lastSpending?: ILastSpendingData;
  lastBasicAnalytics: {
    incomes: IBasicAnalyticsOperationMonthData[];
    outcomes: IBasicAnalyticsOperationMonthData[];
    categories: IBasicAnalyticsCategoryData[];
    operationsCount: number;
  };
}

const initialState: IAnalyticsSlice = {
  lastSpending: {
    previous: { incomes: {}, outcomes: {} },
    selected: { incomes: {}, outcomes: {} },
  },
  lastBasicAnalytics: {
    outcomes: [],
    incomes: [],
    categories: [],
    operationsCount: 0,
  },
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLastSpending.fulfilled, (state, action) => {
      state.lastSpending = action.payload?.data;
    });
    builder.addCase(fetchBasicAnalytics.fulfilled, (state, action) => {
      state.lastBasicAnalytics = action.payload?.data;
    });
  },
});

export const selectLastSpending = (state: RootState) =>
  state.analytics.lastSpending;

export const selectBasicAnalytics = (state: RootState) =>
  state.analytics.lastBasicAnalytics;

export default analyticsSlice.reducer;
