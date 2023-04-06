import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../../common/redux/store";
import { fetchCategories } from "./CategoriesRepository";
import type { ICategoryData } from "./CategoriesInterfaces";

interface ICategoriesSlice {
  categories?: ICategoryData[] | null;
}

const initialState: ICategoriesSlice = {
  categories: null,
};

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload?.data;
    });
  },
});

export const selectCategories = (state: RootState) =>
  state.categories.categories;

export default categoriesSlice.reducer;
