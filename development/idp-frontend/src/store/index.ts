import { configureStore } from '@reduxjs/toolkit'
import itemsReducer from './itemsSlice'
import traefikReducer from './traefikSlice'
import bitbucketReducer from './bitbucketSlice'

const store = configureStore({
  reducer: {
    items: itemsReducer,
    traefik: traefikReducer,
    bitbucket: bitbucketReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
