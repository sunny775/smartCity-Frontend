import { all } from 'redux-saga/effects';
import { getSingleProductWatcher } from './single_product.saga';

export default function* productsSaga() {
    yield all([
        getSingleProductWatcher()
    ]);
}