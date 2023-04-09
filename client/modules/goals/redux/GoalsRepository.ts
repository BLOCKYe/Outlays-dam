/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 09/04/2023
 * Time: 13:07
 */

import type { IGoalsResponse } from "./GoalsInterfaces";
import httpClient from "../../../common/axios/HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

/**
 * This method is used to
 * fetch user's operations
 */

export const fetchGoals = createAsyncThunk("goals/all", async (_, thunkAPI) => {
  try {
    const response = await httpClient.get("/api/goals");

    if (response.status !== 200) {
      return thunkAPI.rejectWithValue(response.data);
    }

    return response?.data as IGoalsResponse;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response);
  }
});
