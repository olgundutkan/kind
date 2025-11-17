import {
  CREATE_ITEM_FAILURE,
  CREATE_ITEM_REQUEST,
  CREATE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_REQUEST,
  DELETE_ITEM_SUCCESS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_SUCCESS,
} from '../actions/itemsActions'

const initialState = {
  list: [],
  loading: false,
  submitting: false,
  error: null,
}

export default function itemsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_ITEMS_SUCCESS:
      return { ...state, loading: false, list: action.payload || [] }
    case FETCH_ITEMS_FAILURE:
      return { ...state, loading: false, error: action.payload }
    case CREATE_ITEM_REQUEST:
    case DELETE_ITEM_REQUEST:
      return { ...state, submitting: true, error: null }
    case CREATE_ITEM_SUCCESS:
      return {
        ...state,
        submitting: false,
        list: [action.payload, ...state.list],
      }
    case DELETE_ITEM_SUCCESS:
      return {
        ...state,
        submitting: false,
        list: state.list.filter((item) => item.id !== action.payload),
      }
    case CREATE_ITEM_FAILURE:
    case DELETE_ITEM_FAILURE:
      return { ...state, submitting: false, error: action.payload }
    default:
      return state
  }
}
