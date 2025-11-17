import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchTraefikOverview } from '@api/traefik'

type TraefikState = {
  routers: any[]
  services: any[]
  middlewares: any[]
  loading: boolean
  error?: string
  updatedAt?: string
}

const initialState: TraefikState = {
  routers: [],
  services: [],
  middlewares: [],
  loading: false,
}

export const fetchTraefik = createAsyncThunk<
  { routers: any[]; services: any[]; middlewares: any[] },
  void,
  { rejectValue: string }
>('traefik/fetchOverview', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchTraefikOverview()
    return response.data
  } catch (error: any) {
    return rejectWithValue(error?.message ?? 'Failed to load Traefik data')
  }
})

const traefikSlice = createSlice({
  name: 'traefik',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTraefik.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(
        fetchTraefik.fulfilled,
        (
          state,
          action: PayloadAction<{ routers: any[]; services: any[]; middlewares: any[] }>,
        ) => {
          state.loading = false
          state.routers = action.payload?.routers ?? []
          state.services = action.payload?.services ?? []
          state.middlewares = action.payload?.middlewares ?? []
          state.updatedAt = new Date().toISOString()
        },
      )
      .addCase(fetchTraefik.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) ?? action.error.message
      })
  },
})

export default traefikSlice.reducer
