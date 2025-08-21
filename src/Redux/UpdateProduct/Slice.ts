import { updateInventoryData } from "./Action";
import displayToast, { toastEnums } from "../../helpers/displayToast";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    updateInventoryResponse: [],
    isUpdateInventoryError: false,
    isUpdateInventoryLoading: false,
};

const updateInventorySlice = createSlice({
    name: "updateInventory",
    initialState,
    reducers: {
        clearUpdateInventoryState: (state) => {
            state.updateInventoryResponse = [];
            state.isUpdateInventoryError = false;
            state.isUpdateInventoryLoading = false;
        }    
    },
    extraReducers: (builder) => {
        builder.addCase(updateInventoryData.rejected, (state, action) => {
            displayToast(toastEnums.ERROR, action?.payload?.message);
            state.isUpdateInventoryError = true;
            state.updateInventoryResponse = action.payload;
            state.isUpdateInventoryLoading = false;
        });
        builder.addCase(updateInventoryData.pending, (state) => {
            state.isUpdateInventoryLoading = true;
        });
        builder.addCase(updateInventoryData.fulfilled, (state, action) => {
            displayToast(toastEnums.SUCCESS, action?.payload?.message);
            state.updateInventoryResponse = action.payload;
            state.isUpdateInventoryError = false;
            state.isUpdateInventoryLoading = false;
        });
    },
});

export const { clearUpdateInventoryState } = updateInventorySlice.actions;
export default updateInventorySlice;
