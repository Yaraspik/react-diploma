import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import { itemType } from "../../components/Hits/interfaces.ts";

type initialStateType = {
  items: Array<itemType>;
  status: "idle" | "pending" | "success" | "error";
  error: string;
};

const initialState: initialStateType = {
  items: [],
  status: "idle",
  error: "",
};

export const hitsSlice = createSlice({
  name: "hits",
  initialState,
  reducers: {
    hitsRequest: (state) => {
      state.status = "pending";
    },
    hitsSuccess: (state, action) => {
      state.items = action.payload;
      state.status = "success";
    },
    hitsFailure: (state, action) => {
      state.status = "error";
      state.error = action.payload;
    },
  },
});

export const hits = (state: RootState) => state.hits;
export const { hitsRequest, hitsSuccess, hitsFailure } = hitsSlice.actions;
export default hitsSlice.reducer;
