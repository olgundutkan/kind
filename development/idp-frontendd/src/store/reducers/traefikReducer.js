import {
  FETCH_TRAEFIK_FAILURE,
  FETCH_TRAEFIK_REQUEST,
  FETCH_TRAEFIK_SUCCESS,
} from '../actions/traefikActions'

const initialState = {
  routers: [],
  services: [],
  middlewares: [],
  loading: false,
  error: null,
  updatedAt: null,
}

export default function traefikReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TRAEFIK_REQUEST:
      return { ...state, loading: true, error: null }
    case FETCH_TRAEFIK_SUCCESS:
      return {
        ...state,
        loading: false,
        routers: action.payload.routers || [],
        services: action.payload.services || [],
        middlewares: action.payload.middlewares || [],
        updatedAt: new Date().toISOString(),
      }
    case FETCH_TRAEFIK_FAILURE:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
