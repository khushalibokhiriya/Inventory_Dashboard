import { addInventoryData } from "./Action";
import displayToast, { toastEnums } from "../../helpers/displayToast";

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addInventoryResponse: [],
    isAddInventoryError: false,
    isAddInventoryLoading: false,
};

const addInventorySlice = createSlice({
    name: "addInventory",
    initialState,
    reducers: {
        clearAddInventoryState: (state) => {
            state.addInventoryResponse = [];
            state.isAddInventoryError = false;
            state.isAddInventoryLoading = false;
        }    
    },
    extraReducers: (builder) => {
        builder.addCase(addInventoryData.rejected, (state, action) => {
            displayToast(toastEnums.ERROR, action?.payload?.message);
            state.isAddInventoryError = true;
            state.addInventoryResponse = action.payload;
            state.isAddInventoryLoading = false;
        });
        builder.addCase(addInventoryData.pending, (state) => {
            state.isAddInventoryLoading = true;
        });
        builder.addCase(addInventoryData.fulfilled, (state, action) => {
            displayToast(toastEnums.SUCCESS, action?.payload?.message);
            state.addInventoryResponse = action.payload;
            state.isAddInventoryError = false;
            state.isAddInventoryLoading = false;
        });
    },
});

export const { clearAddInventoryState } = addInventorySlice.actions;
export default addInventorySlice;
