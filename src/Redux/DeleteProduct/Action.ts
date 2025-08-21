import { createAsyncThunk, type GetThunkAPI } from "@reduxjs/toolkit";

import { TWO_HUNDRED } from "../../constants/Numeric/numeric";
import { endPoints } from "../../constants/Appconfig"
import http from "../../axios/api";
import { getInventoryData } from "../GetProduct/Action";

export const deleteInventoryData: any = createAsyncThunk("delete_inventory_data", async (id: number, thunkAPI: GetThunkAPI<any>) => {
    try {
        const response: any = await http.delete(`${endPoints.DELETE_DATA.DELETE_INVENTORY_PRODUCTS}/${id}`);
        if (response?.data?.statusCode != TWO_HUNDRED) {
            return thunkAPI.rejectWithValue(response?.data);
        }
        thunkAPI.dispatch(getInventoryData());
        return thunkAPI.fulfillWithValue(response?.data);
    } catch (error: any) {
        return thunkAPI.rejectWithValue(error?.response?.data);
    }
});
