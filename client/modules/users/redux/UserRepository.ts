/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 15.08.2022
 * Time: 19:16
 */

import { createAsyncThunk } from "@reduxjs/toolkit";
import type {
  ILoginRequest,
  ILoginResponse,
  IRegisterRequest,
  IUserResponse,
  IVerifyRequest,
} from "./UserInterfaces";
import httpClient from "../../../common/axios/HttpClient";

/**
 * This method is used to
 * sign-in user
 */

export const login = createAsyncThunk(
  "user/login",
  async (values: ILoginRequest, thunkAPI) => {
    try {
      const response = await httpClient.post("/api/auth/login", values);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as ILoginResponse;
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
      const response = await httpClient.post("/api/auth/register", values);

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as ILoginResponse;
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
      const response = await httpClient.get("/api/profile/user");

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IUserResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);

/**
 * This method is used to
 * verify account
 */
export const verify = createAsyncThunk(
  "user/verify",
  async (values: IVerifyRequest, thunkAPI) => {
    try {
      const response = await httpClient.get(
        `/api/auth/verify/${values.verifyKey}`
      );

      if (response.status !== 200) {
        return thunkAPI.rejectWithValue(response.data);
      }

      return response?.data as IUserResponse;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response);
    }
  }
);
