/*
 * Project: Outlays-dam
 * Author: Dominik Obłoza
 * User: @BLOCKYe
 * Date: 05.09.2022
 * Time: 23:16
*/

import {createAsyncThunk} from "@reduxjs/toolkit";
import httpClient from "../../../common/axios/HttpClient";
import {ICategoriesResponse, ICategoryRequest} from "./CategoriesInterfaces";


/**
 * This method is used to
 * fetch user's categories
 */

export const fetchCategories = createAsyncThunk(
    "categories/all",
    async (_, thunkAPI) => {
        try {
            const response = await httpClient.get<ICategoriesResponse>("/api/categories");
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
    async (values: ICategoryRequest, thunkAPI) => {
        try {
            const response = await httpClient.post<ICategoriesResponse>("/api/categories", values);
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


interface ICategoryData {
    values: ICategoryRequest,
    id: string
}

/**
 * This method is used to
 * create new category
 */

export const editCategory = createAsyncThunk(
    "categories/edit",
    async (categoryData: ICategoryData, thunkAPI) => {
        try {
            const response = await httpClient.put<ICategoriesResponse>(`/api/categories/${categoryData.id}`, categoryData.values);
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);


/**
 * This method is used to
 * create new category
 */

export const deleteCategory = createAsyncThunk(
    "categories/delete",
    async (id: string, thunkAPI) => {
        try {
            const response = await httpClient.delete<ICategoriesResponse>(`/api/categories/${id}`);
            return response?.data
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);
