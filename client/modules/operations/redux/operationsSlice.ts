import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../common/redux/store";
import { fetchOperations } from "./OperationsRepository";
import type { IOperationData } from "./OperationInterfaces";

interface IOperationsSlice {
  operations?: IOperationData[] | null;
}

const initialState: IOperationsSlice = {
  operations: null,
};

export const operationsSlice = createSlice({
  name: "operations",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchOperations.fulfilled, (state, action) => {
      state.operations = action.payload?.data;
    });
  },
});

export const selectOperations = (state: RootState) =>
  state.operations.operations;

export default operationsSlice.reducer;
