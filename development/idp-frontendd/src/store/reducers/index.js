import { combineReducers } from 'redux'

import itemsReducer from './itemsReducer'
import traefikReducer from './traefikReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  items: itemsReducer,
  traefik: traefikReducer,
  user: userReducer,
})

export default rootReducer
