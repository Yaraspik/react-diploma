import {createSlice} from "@reduxjs/toolkit";
import {RootState} from '../store.ts';
import {catalogItemDetailType, catalogItemType} from "../../components/Catalog/interfaces.ts";
import {activate} from "./categorySlice.ts";

type initialStateType = {
    items: catalogItemType[],
    status: "idle" | "pending" | "success" | "error",
    error: string,
    activatedCategory: number,
    itemLength: number,
    offset: number,
    searchQuery: string,
    item: catalogItemDetailType | null,
    id: null,
}

const initialState: initialStateType = {
    items: [],
    status: "idle",
    error: "",
    activatedCategory: 0,
    itemLength: 0,
    offset: 0,
    searchQuery: "",
    item: null,
    id: null,
};

export const catalogSlice = createSlice({
    name: "catalog",
    initialState,
    reducers: {
        catalogRequest: (state) => {
            state.status = "pending";
        },
        catalogRequestSuccess: (state, action) => {
            state.status = "success";
            state.items = [...state.items.concat(action.payload)];
            state.itemLength = action.payload.length;
        },
        catalogReset: () => initialState,
        catalogRequestFailure: (state, action) => {
            state.status = "error";
            state.error = action.payload;
        },
        getMore: (state, action) => {
            state.status = "pending";
            const { activatedCategory, offset } = action.payload;
            state.activatedCategory = activatedCategory;
            state.offset = offset;
        },
        findItem: (state, action) => {
            state.id = action.payload;
            state.status = "pending";
        },
        getItems: (state, action) => {
            if(action.payload.searchQuery) {
                state.searchQuery = action.payload.searchQuery;
            }
            state.activatedCategory = action.payload.activatedCategory;
            state.items = [];
            state.status = "pending";
        },
        searchSuccess: (state, action) => {
            state.status = "success";
            state.item = action.payload;
        }
    },
    extraReducers: builder => {
        builder.addCase(activate, (state, action) => {
            state.items = [];
            state.activatedCategory = action.payload;
            state.status = "pending";
        })
    }
});

export const _searchQuery = (state: RootState) => state.catalog.searchQuery;
export const _item = (state: RootState) => state.catalog.item;
export const _status = (state: RootState) => state.catalog.status;
export const _error = (state: RootState) => state.catalog.error;
export const items = (state: RootState) => state.catalog.items;
export const catalog = (state: RootState) => state.catalog;
export const {
    catalogRequestSuccess,
    catalogRequest,
    searchSuccess,
    findItem,
    getMore,
    catalogRequestFailure,
    catalogReset,
    getItems,
} = catalogSlice.actions;
export default catalogSlice.reducer;
