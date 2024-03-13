import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store.ts";
import { cartItemType } from "../../components/Cart/interfaces.ts";

type initialStateType = {
  list: Array<cartItemType>;
};

const initialState: initialStateType = {
  list: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    cartAdd: (state, { payload }) => {
      state.list = payload;
    },
    cartReset: () => initialState,
  },
});

export const _cart = (state: RootState) => state.cart.list;
export const { cartAdd, cartReset } = cartSlice.actions;
export default cartSlice.reducer;
