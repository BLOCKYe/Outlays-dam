/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import {ILoginRequest, ILoginResponse, IRegisterRequest, IUserResponse} from "./UserInterfaces";
import httpClient from "../../../common/axios/HttpClient";

/**
 * This method is used to
 * sign-in user
 */

export const login = createAsyncThunk(
    "user/login",
    async (values: ILoginRequest, thunkAPI) => {
        try {
            const response = await httpClient.post<ILoginResponse>("/api/auth/login", values);
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
            const response = await httpClient.post<any>("/api/auth/register", values);
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
    async (_, thunkAPI) => {
        try {
            const response = await httpClient.get<IUserResponse>("/api/profile/user");
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)