/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {ILoginRequest, ILoginResponse, IRegisterRequest, IUserResponse} from "./UserInterfaces";
import {CookieValueTypes} from "cookies-next";

/**
 * This method is used to
 * sign-in user
 */

export const login = createAsyncThunk(
    "user/login",
    async (values: ILoginRequest, thunkAPI) => {
        try {
            const response = await axios.post<ILoginResponse>(process.env.NEXT_PUBLIC_BACKEND_API + "/api/auth/login", values);
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


/**
 * This method is used to
 * sign-up user
 */

export const register = createAsyncThunk(
    "user/register",
    async (values: IRegisterRequest, thunkAPI) => {
        try {
            const response = await axios.post<any>(process.env.NEXT_PUBLIC_BACKEND_API + "/api/auth/register", values);
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


/**
 * This method is used to
 * fetch user profile
 */

export const fetchUserProfile = createAsyncThunk(
    "user/profile",
    async (token: CookieValueTypes, thunkAPI) => {
        try {
            const response = await axios.get<IUserResponse>(process.env.NEXT_PUBLIC_BACKEND_API + "/api/profile/user", {
                headers: {
                    'Authorization': `${token}`
                }
            });
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)