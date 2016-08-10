import { takeEvery } from 'redux-saga';
import { put } from 'redux-saga/effects';
import { api } from '../_data/LiveData';
import { CHANGE_INFO_FOR_ASSET } from '../_constants/ActionTypes';


function* handleAssetInfoChange(action) {
    const { symbol } = action;

}

export default function* root() {
    yield takeEvery(CHANGE_INFO_FOR_ASSET, handleAssetInfoChange);
}