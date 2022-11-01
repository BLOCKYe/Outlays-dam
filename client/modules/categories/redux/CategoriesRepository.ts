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
            const response = await httpClient.get("/api/categories");

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as ICategoriesResponse
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
            const response = await httpClient.post("/api/categories", values);

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as ICategoriesResponse
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
            const response = await httpClient.put(`/api/categories/${categoryData.id}`, categoryData.values);

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as ICategoriesResponse
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
            const response = await httpClient.delete(`/api/categories/${id}`);

            if (response.status !== 200) {
                return thunkAPI.rejectWithValue(response.data)
            }

            return response?.data as ICategoriesResponse
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data);
        }
    }
);
