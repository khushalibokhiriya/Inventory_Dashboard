import { createAsyncThunk, type GetThunkAPI } from "@reduxjs/toolkit";

import { TWO_HUNDRED } from "../../constants/Numeric/numeric";
import { endPoints } from "../../constants/Appconfig"
import http from "../../axios/api";
import { getInventoryData } from "../GetProduct/Action";

interface ParamsData {
    name: string;
    quantity: number
}

export const addInventoryData: any = createAsyncThunk("add_inventory_data", async (data: ParamsData,thunkAPI: GetThunkAPI<any>) => {
    try {
        const response: any = await http.post(endPoints.POST_DATA.POST_INVENTORY_PRODUCTS, data);
        if (response?.data?.statusCode != TWO_HUNDRED) {
            return thunkAPI.rejectWithValue(response?.data);
        }
        thunkAPI.dispatch(getInventoryData());
        return thunkAPI.fulfillWithValue(response?.data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});
