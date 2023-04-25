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
      const response = await httpClient.get(`/api/operations`);

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
 * fetch user's operations
 * for category
 */
export const fetchOperationsForCategory = createAsyncThunk(
  "operations/byCategory",
  async (categoryId: string, thunkAPI) => {
    try {
      const response = await httpClient.get(
        `/api/operations/category/${categoryId}`
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

interface IFetchMoreOperationsForCategoryArgs {
  page: number;
  categoryId: string;
}

/**
 * This method is used to
 * fetch user's operations
 * for category
 */
export const fetchMoreOperationsForCategory = createAsyncThunk(
  "operations/byCategory",
  async (args: IFetchMoreOperationsForCategoryArgs, thunkAPI) => {
    const RESULTS_ON_PAGE = 10;
    const PAGE = args.page ?? 1;

    try {
      const response = await httpClient.get(
        `/api/operations/category/${args.categoryId}?resultsOnPage=${RESULTS_ON_PAGE}&page=${PAGE}`
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
 * fetch user's operations
 */
export const fetchMoreOperations = createAsyncThunk(
  "operations/allPagination",
  async (page: number, thunkAPI) => {
    const RESULTS_ON_PAGE = 1;
    const PAGE = page ?? 10;
    try {
      const response = await httpClient.get(
        `/api/operations?resultsOnPage=${RESULTS_ON_PAGE}&page=${PAGE}`
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
 * create new operation
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
 * edit operation
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
 * remove operation
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
