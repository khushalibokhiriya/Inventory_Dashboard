import { getInventoryData } from "./Action";
import displayToast, { toastEnums } from "../../helpers/displayToast";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    getInventoryResponse: [],
    isGetInventoryError: false,
    isGetInventoryLoading: false,
};

const getInventorySlice = createSlice({
    name: "getInventory",
    initialState,
    reducers: {
        clearGetInventoryState: (state) => {
            state.getInventoryResponse = [];
            state.isGetInventoryError = false;
            state.isGetInventoryLoading = false;
        }    
    },
    extraReducers: (builder) => {
        builder.addCase(getInventoryData.rejected, (state, action) => {
            displayToast(toastEnums.ERROR, action?.payload?.message);
            state.isGetInventoryError = true;
            state.getInventoryResponse = action.payload?.data;
            state.isGetInventoryLoading = false;
        });
        builder.addCase(getInventoryData.pending, (state) => {
            state.isGetInventoryLoading = true;
        });
        builder.addCase(getInventoryData.fulfilled, (state, action) => {
            displayToast(toastEnums.SUCCESS, action?.payload?.message);
            state.getInventoryResponse = action.payload?.data;
            state.isGetInventoryError = false;
            state.isGetInventoryLoading = false;
        });
    },
});

export const { clearGetInventoryState } = getInventorySlice.actions;
export default getInventorySlice;
