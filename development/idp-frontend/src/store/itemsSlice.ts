import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getItemsRequest } from '@api/items'

type Item = {
  id: number
  name: string
  description?: string
}

type ItemsState = {
  data: Item[]
  loading: boolean
  error?: string
}

const initialState: ItemsState = {
  data: [],
  loading: false,
}

export const fetchItems = createAsyncThunk<Item[], void, { rejectValue: string }>(
  'items/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getItemsRequest()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to load items')
    }
  },
)

const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true
        state.error = undefined
      })
      .addCase(fetchItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
        state.loading = false
        state.data = action.payload ?? []
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) ?? action.error.message
      })
  },
})

export default itemsSlice.reducer
