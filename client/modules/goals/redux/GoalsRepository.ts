/*
 * Project: outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 09/04/2023
 * Time: 13:07
 */

import type { IGoalRequest, IGoalsResponse } from "./GoalsInterfaces";
import httpClient from "../../../common/axios/HttpClient";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IGoalResponse } from "./GoalsInterfaces";
import {
  IOperationRequest,
  IOperationsResponse,
} from "../../operations/redux/OperationInterfaces";

/**
 * This method is used to
 * fetch user's goals
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

/**
 * This method is used to
 * create new outlay
 */

export const createGoal = createAsyncThunk(
  "goals/create",
  async (values: IGoalRequest, thunkAPI) => {
    try {
      const response = await httpClient.post("/api/goals", values);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IGoalResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

interface IGoalData {
  values: IGoalRequest;
  id: string;
}

/**
 * This method is used to
 * edit goal
 */
export const editGoal = createAsyncThunk(
  "goals/edit",
  async (values: IGoalData, thunkAPI) => {
    try {
      const response = await httpClient.put(
        `/api/goals/${values.id}`,
        values.values
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IGoalResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/**
 * This method is used to
 * remove goal
 */
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await httpClient.delete(`/api/goals/${id}`);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IGoalResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/**
 * This method is used to
 * set goal as reached
 */
export const setAsReached = createAsyncThunk(
  "goals/reached",
  async (id: string, thunkAPI) => {
    try {
      const response = await httpClient.patch(`/api/goals/${id}`);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IGoalResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
