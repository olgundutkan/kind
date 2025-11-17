import { call, put, takeLatest } from 'redux-saga/effects'
import {
  CREATE_ITEM_REQUEST,
  createItemFailure,
  createItemSuccess,
  DELETE_ITEM_REQUEST,
  deleteItemFailure,
  deleteItemSuccess,
  FETCH_ITEMS_REQUEST,
  fetchItemsFailure,
  fetchItemsSuccess,
} from '../actions/itemsActions'
import {
  createItem,
  deleteItem,
  fetchItems,
} from '../../api/idpApi'

function* fetchItemsWorker() {
  try {
    const data = yield call(fetchItems)
    yield put(fetchItemsSuccess(data))
  } catch (error) {
    yield put(fetchItemsFailure(error.message || 'Unable to fetch items'))
  }
}

function* createItemWorker(action) {
  try {
    const payload = yield call(createItem, action.payload)
    yield put(createItemSuccess(payload))
  } catch (error) {
    yield put(createItemFailure(error.message || 'Failed to create item'))
  }
}

function* deleteItemWorker(action) {
  try {
    const id = yield call(deleteItem, action.payload)
    yield put(deleteItemSuccess(id))
  } catch (error) {
    yield put(deleteItemFailure(error.message || 'Failed to delete item'))
  }
}

export default function* itemsSaga() {
  yield takeLatest(FETCH_ITEMS_REQUEST, fetchItemsWorker)
  yield takeLatest(CREATE_ITEM_REQUEST, createItemWorker)
  yield takeLatest(DELETE_ITEM_REQUEST, deleteItemWorker)
}
