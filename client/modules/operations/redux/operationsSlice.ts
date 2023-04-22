import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../common/redux/store";
import { fetchMoreOperations, fetchOperations } from "./OperationsRepository";
import type { IOperationData } from "./OperationInterfaces";

interface IOperationsSlice {
  operations?: IOperationData[];
}

const initialState: IOperationsSlice = {
  operations: [],
};

export const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOperations.fulfilled, (state, action) => {
      state.operations = action.payload?.data;
    });
    builder.addCase(fetchMoreOperations.fulfilled, (state, action) => {
      state.operations = (state.operations ?? []).concat(action.payload?.data);
    });
  },
});

export const selectOperations = (state: RootState) =>
  state.operations.operations;

export default operationsSlice.reducer;
