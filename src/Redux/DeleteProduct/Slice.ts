import { deleteInventoryData } from "./Action";
import displayToast, { toastEnums } from "../../helpers/displayToast";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    deleteInventoryResponse: [],
    isDeleteInventoryError: false,
    isDeleteInventoryLoading: false,
};

const deleteInventorySlice = createSlice({
    name: "deleteInventory",
    initialState,
    reducers: {
        clearDeleteInventoryState: (state) => {
            state.deleteInventoryResponse = [];
            state.isDeleteInventoryError = false;
            state.isDeleteInventoryLoading = false;
        }    
    },
    extraReducers: (builder) => {
        builder.addCase(deleteInventoryData.rejected, (state, action) => {
            displayToast(toastEnums.ERROR, action?.payload?.message);
            state.isDeleteInventoryError = true;
            state.deleteInventoryResponse = action.payload;
            state.isDeleteInventoryLoading = false;
        });
        builder.addCase(deleteInventoryData.pending, (state) => {
            state.isDeleteInventoryLoading = true;
        });
        builder.addCase(deleteInventoryData.fulfilled, (state, action) => {
            displayToast(toastEnums.SUCCESS, action?.payload?.message);
            state.deleteInventoryResponse = action.payload;
            state.isDeleteInventoryError = false;
            state.isDeleteInventoryLoading = false;
        });
    },
});

export const { clearDeleteInventoryState } = deleteInventorySlice.actions;
export default deleteInventorySlice;
