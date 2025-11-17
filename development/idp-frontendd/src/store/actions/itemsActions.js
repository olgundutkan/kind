export const FETCH_ITEMS_REQUEST = 'items/FETCH_ITEMS_REQUEST'
export const FETCH_ITEMS_SUCCESS = 'items/FETCH_ITEMS_SUCCESS'
export const FETCH_ITEMS_FAILURE = 'items/FETCH_ITEMS_FAILURE'

export const CREATE_ITEM_REQUEST = 'items/CREATE_ITEM_REQUEST'
export const CREATE_ITEM_SUCCESS = 'items/CREATE_ITEM_SUCCESS'
export const CREATE_ITEM_FAILURE = 'items/CREATE_ITEM_FAILURE'

export const DELETE_ITEM_REQUEST = 'items/DELETE_ITEM_REQUEST'
export const DELETE_ITEM_SUCCESS = 'items/DELETE_ITEM_SUCCESS'
export const DELETE_ITEM_FAILURE = 'items/DELETE_ITEM_FAILURE'

export const fetchItemsRequest = () => ({
  type: FETCH_ITEMS_REQUEST,
})

export const fetchItemsSuccess = (items) => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: items,
})

export const fetchItemsFailure = (error) => ({
  type: FETCH_ITEMS_FAILURE,
  payload: error,
})

export const createItemRequest = (item) => ({
  type: CREATE_ITEM_REQUEST,
  payload: item,
})

export const createItemSuccess = (item) => ({
  type: CREATE_ITEM_SUCCESS,
  payload: item,
})

export const createItemFailure = (error) => ({
  type: CREATE_ITEM_FAILURE,
  payload: error,
})

export const deleteItemRequest = (id) => ({
  type: DELETE_ITEM_REQUEST,
  payload: id,
})

export const deleteItemSuccess = (id) => ({
  type: DELETE_ITEM_SUCCESS,
  payload: id,
})

export const deleteItemFailure = (error) => ({
  type: DELETE_ITEM_FAILURE,
  payload: error,
})
