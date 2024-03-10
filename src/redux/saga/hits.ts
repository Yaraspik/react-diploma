import {hitsRequest, hitsSuccess, hitsFailure} from "../slices/hitsSlice.ts";
import {put, takeEvery} from "redux-saga/effects";
import {getHits} from "../../api/fetchApi.ts";

function* watchHitsSaga() {
    yield takeEvery(hitsRequest, handleHitsSaga);
}

function* handleHitsSaga(): Generator {
    try {
        const data = yield getHits();
        yield put(hitsSuccess(data));
    } catch (e: any) {
        yield put(hitsFailure(e.message));
    }
}

export default watchHitsSaga;