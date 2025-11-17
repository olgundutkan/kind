import { SET_LANGUAGE, SET_ROLE } from '../actions/userActions'

const initialState = {
  name: 'Dev User',
  role: 'admin',
  language: 'en',
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ROLE:
      return { ...state, role: action.payload }
    case SET_LANGUAGE:
      return { ...state, language: action.payload }
    default:
      return state
  }
}
