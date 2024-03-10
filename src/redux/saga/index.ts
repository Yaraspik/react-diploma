import {put, spawn, takeLatest} from "redux-saga/effects";
import {
    getItemInfo,
    sendOrder,
    getCatalogItemById,
} from "../../api/fetchApi.ts";

import {orderRequest, orderRequestFailure, orderRequestSuccess} from "../slices/orderSlice.ts";
import {
    catalogRequestSuccess,
    searchSuccess,
    findItem,
    catalogRequestFailure,
} from "../slices/catalogSlice.ts";
import {activate} from "../slices/categorySlice.ts";

import watchHitsSaga from "./hits.ts";
import {watchLoadMoreItemsSaga, watchCatalogSaga, watchGetItemsSaga} from "./catalog.ts";
import watchCategoriesListSaga from "./category.ts";

function* handleNotAllCatalogItemsSaga({payload} : {payload: number}): Generator {
    try {
        const data = yield getCatalogItemById(payload);
        yield put(catalogRequestSuccess(data));
    } catch (e: any) {
        yield put(catalogRequestFailure(e));
    }
}

function* watchNotAllCatalogItemsSaga() {
    yield takeLatest(activate, handleNotAllCatalogItemsSaga);
}

function* handleGetItemInfoSaga(action: {payload: string}): Generator {
    try {
        const data = yield getItemInfo(action.payload);
        yield put(searchSuccess(data));
    } catch (e: any) {
        yield put(catalogRequestFailure(e.message));
    }
}

function* watchGetItemInfoSaga() {
    yield takeLatest(findItem, handleGetItemInfoSaga);
}

function* handleSendOrderSaga(action: {payload: {}}): Generator {
    try {
        const data = yield sendOrder(action.payload);
        yield put(orderRequestSuccess(data));
    } catch (e: any) {
        yield put(orderRequestFailure(e.message));
    }
}

function* watchSendOrderSaga() {
    yield takeLatest(orderRequest, handleSendOrderSaga);
}

export default function* saga() {
    yield spawn(watchHitsSaga);
    yield spawn(watchCategoriesListSaga);
    yield spawn(watchCatalogSaga);
    yield spawn(watchNotAllCatalogItemsSaga);
    yield spawn(watchLoadMoreItemsSaga);
    yield spawn(watchGetItemInfoSaga);
    yield spawn(watchSendOrderSaga);
    yield spawn(watchGetItemsSaga);
}
