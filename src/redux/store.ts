import createSagaMiddleware from "redux-saga";
import catalogSlice from "./slices/catalogSlice.ts";
import saga from "../redux/saga/index.ts";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice.ts";
import orderSlice from "./slices/orderSlice.ts";
import hitsSlice from "./slices/hitsSlice.ts";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    hits: hitsSlice,
    catalog: catalogSlice,
    order: orderSlice,
    cart: cartSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
