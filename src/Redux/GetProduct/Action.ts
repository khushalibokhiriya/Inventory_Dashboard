import { createAsyncThunk, type GetThunkAPI } from "@reduxjs/toolkit";

import { TWO_HUNDRED } from "../../constants/Numeric/numeric";
import { endPoints } from "../../constants/Appconfig"
import http from "../../axios/api";

interface ParamsData {
    search?: string;
    sortOrder?: string;
}

export const getInventoryData: any = createAsyncThunk("get_Inventory_data", async (data: ParamsData,thunkAPI: GetThunkAPI<any>) => {
    try {
        const params = new URLSearchParams();
        if (data?.search) params.append('search', data?.search.toString());
        if (data?.sortOrder) params.append('sortOrder', data?.sortOrder.toString());
        const queryString = params.toString();

        const response: any = await http.get(`${endPoints.GET_DATA.GET_INVENTORY_PRODUCTS}?${queryString}`);
        if (response?.data?.statusCode != TWO_HUNDRED) {
            return thunkAPI.rejectWithValue(response?.data);
        }
        return thunkAPI.fulfillWithValue(response?.data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});
