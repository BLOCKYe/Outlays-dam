import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../common/redux/store";
import { fetchLastSpending } from "./AnalyticsRepository";
import type { ILastSpendingData } from "./AnalyticsInterfaces";

interface IAnalyticsSlice {
  lastSpending?: ILastSpendingData;
}

const initialState: IAnalyticsSlice = {
  lastSpending: {},
};

export const analyticsSlice = createSlice({
  name: "analytics",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchLastSpending.fulfilled, (state, action) => {
      state.lastSpending = action.payload?.data;
    });
  },
});

export const selectLastSpending = (state: RootState) =>
  state.analytics.lastSpending;

export default analyticsSlice.reducer;
