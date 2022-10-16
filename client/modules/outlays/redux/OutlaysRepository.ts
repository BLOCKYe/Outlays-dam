/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import {IOutlayRequest, IOutlaysResponse} from "./OutlaysInterfaces";
import httpClient from "../../../common/axios/HttpClient";


/**
 * This method is used to
 * fetch user's outlays
 */

export const fetchOutlays = createAsyncThunk(
    "outlays/all",
    async (_, thunkAPI) => {
        try {
            const response = await httpClient.get<IOutlaysResponse>("/api/outlays");
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response);
        }
    }
)


/**
 * This method is used to
 * create new outlay
 */

export const createOutlay = createAsyncThunk(
    "outlays/create",
    async (values: IOutlayRequest, thunkAPI) => {
        try {
            const response = await httpClient.post<any>("/api/outlays", values);
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);
