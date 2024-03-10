import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

type initialStateType = {
    info: unknown,
    order: string,
    success: boolean | null,
    loading: boolean,
    error: boolean,
}

const initialState: initialStateType = {
    info: "",
    order: "",
    success: null,
    loading: false,
    error: false,
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        orderRequest: (state, action) => {
            state.info = action.payload;
            state.loading = true;
            state.error = false;
        },
        orderRequestSuccess: (state, action) => {
            state.success = action.payload;
            state.loading = false;
            state.error = false;
        },
        orderRequestFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        orderReset: () => initialState,
    },
});

export const _order = (state: RootState) => state.order;
export const {orderRequest, orderRequestSuccess, orderRequestFailure, orderReset} = orderSlice.actions;
export default orderSlice.reducer;

