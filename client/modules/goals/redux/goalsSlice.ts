import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../common/redux/store";
import type { IGoalData } from "./GoalsInterfaces";
import { fetchGoals } from "./GoalsRepository";

interface IGoalsSlice {
  goals?: IGoalData[] | null;
}

const initialState: IGoalsSlice = {
  goals: null,
};

export const goalsSlice = createSlice({
  name: "goals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGoals.fulfilled, (state, action) => {
      state.goals = action.payload?.data;
    });
  },
});

export const selectGoals = (state: RootState) => state.goals.goals;

export default goalsSlice.reducer;
