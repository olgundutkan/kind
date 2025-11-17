import { call, put, takeLatest } from 'redux-saga/effects'
import {
  FETCH_TRAEFIK_REQUEST,
  fetchTraefikFailure,
  fetchTraefikSuccess,
} from '../actions/traefikActions'
import { fetchTraefikOverview } from '../../api/idpApi'

function* fetchTraefikWorker() {
  try {
    const data = yield call(fetchTraefikOverview)
    yield put(fetchTraefikSuccess(data))
  } catch (error) {
    yield put(
      fetchTraefikFailure(error.message || 'Failed to load Traefik data'),
    )
  }
}

export default function* traefikSaga() {
  yield takeLatest(FETCH_TRAEFIK_REQUEST, fetchTraefikWorker)
}
