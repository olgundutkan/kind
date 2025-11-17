export const FETCH_TRAEFIK_REQUEST = 'traefik/FETCH_TRAEFIK_REQUEST'
export const FETCH_TRAEFIK_SUCCESS = 'traefik/FETCH_TRAEFIK_SUCCESS'
export const FETCH_TRAEFIK_FAILURE = 'traefik/FETCH_TRAEFIK_FAILURE'

export const fetchTraefikRequest = () => ({
  type: FETCH_TRAEFIK_REQUEST,
})

export const fetchTraefikSuccess = (payload) => ({
  type: FETCH_TRAEFIK_SUCCESS,
  payload,
})

export const fetchTraefikFailure = (error) => ({
  type: FETCH_TRAEFIK_FAILURE,
  payload: error,
})
