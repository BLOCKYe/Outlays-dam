/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ILoginRequest, ILoginResponse, IUserResponse} from "./UserInterfaces";
import {CookieValueTypes} from "cookies-next";

/**
 * This method is used to
 * sign-in user and save
 * token in cookies
 */

export const login = createAsyncThunk(
    "user/login",
    async (values: ILoginRequest, thunkAPI) => {
        try {
            const response = await axios.post<ILoginResponse>("api/auth/login", values);
            return response.data
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
    async ({}, thunkAPI) => {
        try {
            const response = await axios.get<IUserResponse>("api/profile/user", {
                headers: {
                    'Authorization': `Bearer 123`
                }
            });

            return response.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)