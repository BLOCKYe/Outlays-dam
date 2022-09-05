import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../../common/redux/store";
import {fetchCategories} from "./CategoriesRepository";
import {ICategoryData} from "./CategoriesInterfaces";

interface IOutlaysSlice {
    categories?: ICategoryData[]
}

const initialState: IOutlaysSlice = {
    categories: []
}

export const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCategories.fulfilled, (state, action) => {
            state.categories = action.payload?.data
        });
    },
})

export const selectCategories = (state: RootState) => state.categories.categories;

export default categoriesSlice.reducer;
