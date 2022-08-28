/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {CookieValueTypes} from "cookies-next";
import {IOutlaysResponse} from "./OutlaysInterfaces";


/**
 * This method is used to
 * fetch user's outlays
 */

export const fetchOutlays = createAsyncThunk(
    "outlays/all",
    async (token: CookieValueTypes, thunkAPI) => {
        try {
            const response = await axios.get<IOutlaysResponse>(process.env.NEXT_PUBLIC_BACKEND_API + "/api/outlays", {
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