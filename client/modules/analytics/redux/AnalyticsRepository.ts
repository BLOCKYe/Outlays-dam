/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 16.10.2022
 * Time: 02:30
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import httpClient from "../../../common/axios/HttpClient";
import { ILastSpendingResponse } from "./AnalyticsInterfaces";
import { ILoginRequest } from "../../users/redux/UserInterfaces";

/**
 * This method is used to
 * fetch user's last spending
 */
export const fetchLastSpending = createAsyncThunk(
  "analytics/last-stats",
  async (body: { date: Date }, thunkAPI) => {
    try {
      const response = await httpClient.get(`/api/last-stats/${body.date}`);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

/**
 * This method is used to
 * fetch user's last spending
 */
export const fetchBasicAnalytics = createAsyncThunk(
  "analytics/last-basic",
  async (body: { date: Date }, thunkAPI) => {
    try {
      const response = await httpClient.get(`/api/stats/${body.date}`);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
