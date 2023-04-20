/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  IOperationRequest,
  IOperationsResponse,
} from "./OperationInterfaces";
import httpClient from "../../../common/axios/HttpClient";

/**
 * This method is used to
 * fetch user's operations
 */

export const fetchOperations = createAsyncThunk(
  "operations/all",
  async (_, thunkAPI) => {
    try {
      const response = await httpClient.get("/api/operations");

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IOperationsResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

/**
 * This method is used to
 * create new outlay
 */

export const createOperation = createAsyncThunk(
  "operations/create",
  async (values: IOperationRequest, thunkAPI) => {
    try {
      const response = await httpClient.post("/api/operations", values);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IOperationsResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

interface IOperationData {
  values: IOperationRequest;
  id: string;
}

/**
 * This method is used to
 * edit outlay
 */

export const editOperation = createAsyncThunk(
  "operations/edit",
  async (values: IOperationData, thunkAPI) => {
    try {
      const response = await httpClient.put(
        `/api/operations/${values.id}`,
        values.values
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IOperationsResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

/**
 * This method is used to
 * remove outlay
 */

export const deleteOperation = createAsyncThunk(
  "operations/delete",
  async (id: string, thunkAPI) => {
    try {
      const response = await httpClient.delete(`/api/operations/${id}`);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IOperationsResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);
