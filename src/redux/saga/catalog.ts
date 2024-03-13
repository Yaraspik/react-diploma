import { put, takeLatest } from "redux-saga/effects";
import {
  catalogRequest,
  catalogRequestFailure,
  catalogRequestSuccess,
  catalogReset,
  getMore,
  getItems as catalogGetItems,
} from "../slices/catalogSlice.ts";
import { getCatalog, getItems, getMoreItems } from "../../api/fetchApi.ts";

//////////
export function* watchCatalogSaga() {
  yield takeLatest(catalogRequest, handleCatalogSaga);
}

function* handleCatalogSaga(): Generator {
  try {
    yield put(catalogReset());
    const data = yield getCatalog();
    yield put(catalogRequestSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(catalogRequestFailure(e.message));
    }
  }
}

//////////
export function* watchLoadMoreItemsSaga() {
  yield takeLatest(getMore, handleGetMoreItemsSaga);
}

function* handleGetMoreItemsSaga({
  payload: { activatedCategory, offset },
}: {
  payload: { activatedCategory: number; offset: number };
}): Generator {
  try {
    const data = yield getMoreItems(activatedCategory, offset);
    yield put(catalogRequestSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(catalogRequestFailure(e.message));
    }
  }
}

//////////
export function* watchGetItemsSaga() {
  yield takeLatest(catalogGetItems, handleGetItemsSaga);
}

function* handleGetItemsSaga({
  payload: { activatedCategory, searchQuery },
}: {
  payload: { activatedCategory: number; searchQuery: string };
}): Generator {
  try {
    const data = yield getItems({
      search: searchQuery,
      category: activatedCategory,
    });
    yield put(catalogRequestSuccess(data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      yield put(catalogRequestFailure(e.message));
    }
  }
}
