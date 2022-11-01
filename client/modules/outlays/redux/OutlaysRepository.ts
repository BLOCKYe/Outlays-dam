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
import {ICategoryRequest} from "../../categories/redux/CategoriesInterfaces";


/**
 * This method is used to
 * fetch user's outlays
 */

export const fetchOutlays = createAsyncThunk(
    "outlays/all",
    async (_, thunkAPI) => {
        try {
            const response = await httpClient.get("/api/outlays");

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as IOutlaysResponse
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
            const response = await httpClient.post("/api/outlays", values);

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as IOutlaysResponse
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


interface IOutlayData {
    values: IOutlayRequest,
    id: string
}


/**
 * This method is used to
 * edit outlay
 */

export const editOutlay = createAsyncThunk(
    "outlays/edit",
    async (values: IOutlayData, thunkAPI) => {
        try {
            const response = await httpClient.put(`/api/outlays/${values.id}`, values.values);

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as IOutlaysResponse
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


/**
 * This method is used to
 * remove outlay
 */

export const deleteOutlay = createAsyncThunk(
    "outlays/edit",
    async (id: string, thunkAPI) => {
        try {
            const response = await httpClient.delete(`/api/outlays/${id}`);

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as IOutlaysResponse
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);
