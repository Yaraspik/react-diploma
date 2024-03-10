import {put, takeLatest} from "redux-saga/effects";
import {request, requestFailure, requestSuccess, reset} from "../slices/categorySlice.ts";
import {getCategory} from "../../api/fetchApi.ts";

function* watchCategoriesListSaga() {
    yield takeLatest(request, handleCategoriesSaga);
}

function* handleCategoriesSaga(): Generator {
    try {
        yield put(reset());
        const data = yield getCategory();
        yield put(requestSuccess(data));
    } catch (e: any) {
        yield put(requestFailure(e.message));
    }
}

export default watchCategoriesListSaga;