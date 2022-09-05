/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 05.09.2022
 * Time: 23:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {CookieValueTypes, getCookie} from "cookies-next";


/**
 * This method is used to
 * fetch user's categories
 */

export const fetchCategories = createAsyncThunk(
    "categories/all",
    async (token: CookieValueTypes, thunkAPI) => {
        try {
            const response = await axios.get<any>(process.env.NEXT_PUBLIC_BACKEND_API + "/api/categories", {
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


/**
 * This method is used to
 * create new category
 */

export const createCategory = createAsyncThunk(
    "categories/create",
    async (values: any, thunkAPI) => {
        const token = getCookie('token');
        try {
            const response = await axios.post<any>(process.env.NEXT_PUBLIC_BACKEND_API + "/api/categories", values, {
                headers: {
                    'Authorization': `${token}`
                }
            });
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);
