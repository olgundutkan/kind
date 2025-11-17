import { all, fork } from 'redux-saga/effects'
import itemsSaga from './itemsSaga'
import traefikSaga from './traefikSaga'

export default function* rootSaga() {
  yield all([fork(itemsSaga), fork(traefikSaga)])
}
