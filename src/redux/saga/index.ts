import { put, spawn, takeLatest } from "redux-saga/effects";
import { getItemInfo, sendOrder } from "../../api/fetchApi.ts";

import {
  orderRequest,
  orderRequestFailure,
  orderRequestSuccess,
} from "../slices/orderSlice.ts";
import {
  searchSuccess,
  findItem,
  catalogRequestFailure,
} from "../slices/catalogSlice.ts";

import watchHitsSaga from "./hits.ts";
import { watchLoadMoreItemsSaga, watchGetItemsSaga } from "./catalog.ts";
import { order } from "../../components/Cart/interfaces.ts";

function* handleGetItemInfoSaga(action: { payload: string }): Generator {
  try {
    const data = yield getItemInfo(action.payload);
    yield put(searchSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(catalogRequestFailure(e.message));
    }
  }
}

function* watchGetItemInfoSaga() {
  yield takeLatest(findItem, handleGetItemInfoSaga);
}

function* handleSendOrderSaga(action: { payload: order }): Generator {
  try {
    const data = yield sendOrder(action.payload);
    yield put(orderRequestSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(orderRequestFailure(e.message));
    }
  }
}

function* watchSendOrderSaga() {
  yield takeLatest(orderRequest, handleSendOrderSaga);
}

export default function* saga() {
  yield spawn(watchHitsSaga);
  yield spawn(watchLoadMoreItemsSaga);
  yield spawn(watchGetItemInfoSaga);
  yield spawn(watchSendOrderSaga);
  yield spawn(watchGetItemsSaga);
}
