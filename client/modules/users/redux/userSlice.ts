import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RootState} from "../../../common/redux/store";
import {fetchUserProfile, login} from "./UserRepository";
import {IUser} from "./UserInterfaces";

interface IUserSlice {
    token?: string,
    user?: IUser
}

const initialState: IUserSlice = {
    token: '',
    user: {}
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload?.data?.accessToken;
        });
        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload?.data?.user;
        });
    },
})

export const selectUserProfile = (state: RootState) => state.user.user;
export const selectToken = (state: RootState) => state.user.token;

export default userSlice.reducer;
