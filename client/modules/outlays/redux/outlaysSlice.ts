import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../common/redux/store";
import {fetchOutlays} from "./OutlaysRepository";
import {IOutlayData} from "./OutlaysInterfaces";

interface IOutlaysSlice {
    outlays?: IOutlayData[]
}

const initialState: IOutlaysSlice = {
    outlays: []
}

export const outlaysSlice = createSlice({
    name: 'outlays',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOutlays.fulfilled, (state, action) => {
            state.outlays = action.payload?.data
        });
    },
})

export const selectOutlays = (state: RootState) => state.outlays.outlays;

export default outlaysSlice.reducer;
