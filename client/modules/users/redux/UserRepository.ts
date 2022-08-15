/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
*/




import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

/**
 * This method is used to
 * sign-in user and save
 * token in cookies
 */

export const login = createAsyncThunk(
    "user/login",
    async (values: any, thunkAPI) => {
        try {
            const response = await axios.post<any>("/auth/login", values);

            if (response.data.acessToken) {
                localStorage.setItem('token', response.data.acessToken)
            }
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
);


/**
 * This method is used to
 * fetch user profile
 */

export const fetchUserProfile = createAsyncThunk(
    "user/profile",
    async (thunkAPI) => {
        try {

        } catch (error: any) {
        }
    }
)