import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../store.ts";

type categoryItemType = {
    id: number,
    title: string,
}
type initialStateType = {
    list: Array<categoryItemType>,
    activatedCategory: 0,
    status: "idle" | "pending" | "success" | "error",
    error: "",
}

const initialState: initialStateType = {
    list: [
        { id: 0, title: "Все" },
    ],
    activatedCategory: 0,
    status: "idle",
    error: "",
};

export const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        request: (state) => {
            state.status = "pending";
        },
        requestSuccess: (state, action) => {
            state.list = [...state.list.concat(action.payload)];
            state.status = "success";
        },
        requestFailure: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        activate: (state, action) => {
            state.activatedCategory = action.payload;
        },
        reset: () => initialState,
    },
});

export const activatedCategory = (state: RootState) => state.category.activatedCategory;
export const category = (state: RootState) => state.category;
export const status = (state: RootState) => state.category.status;
export const {
    requestFailure,
    requestSuccess,
    request,
    activate,
    reset,
} = categorySlice.actions;
export default categorySlice.reducer;
