import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './itemsSlice'
import traefikReducer from './traefikSlice'

const store = configureStore({
  reducer: {
    items: itemsReducer,
    traefik: traefikReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
