import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../../common/redux/store";
import {createWrapper} from "next-redux-wrapper";

const initialState = {
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})


export const selectUserProfile = (state: RootState) =>
    state.user;

export default userSlice.reducer;
