import {
    combineReducers,
    configureStore,
    type EnhancedStore
} from "@reduxjs/toolkit";
import getInventorySlice from "./GetProduct/Slice";
import updateInventorySlice from "./UpdateProduct/Slice";
import deleteInventorySlice from "./DeleteProduct/Slice";
import addInventorySlice from "./AddProduct/Slice";

const rootReducer = combineReducers({
    addInventory: addInventorySlice.reducer,
    getInventory: getInventorySlice.reducer,
    updateInventory: updateInventorySlice.reducer,
    deleteInventory: deleteInventorySlice.reducer
});

export const store: EnhancedStore = configureStore({
    "reducer": rootReducer,
    "middleware": (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
            "serializableCheck": {
                "immutableCheck": import.meta.env.MODE !== 'production'
            },
        }),
});

export default store;
