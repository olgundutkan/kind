import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  addRepository,
  createRepository,
  getRepositories,
  getRepository,
  getRepositoryBranches,
  updateRepository,
  updateRepositoryBranches,
} from '@api/bitbucket'

export type Collaborator = {
  users: { id: number; username: string }[]
  groups: { id: number; name: string }[]
}

export type BitbucketRepository = {
  id: number
  project?: { id: number; name: string }
  bitbucket_project_key?: string
  name: string
  slug?: string
  clone_url?: string
  description?: string
  type?: { id: number; name: string }
  collaborator?: Collaborator
  created_by?: { id: number; username: string }
  created_at?: string
  updated_by?: { id: number; username: string }
  updated_at?: string
}

export type Branch = {
  name: string
  is_auto_build_branch: boolean
  is_auto_deploy_branch: boolean
  is_main_branch: boolean
  last_commit?: string
}

type BitbucketState = {
  list: BitbucketRepository[]
  listLoading: boolean
  detail?: BitbucketRepository
  detailLoading: boolean
  branches: Branch[]
  branchesLoading: boolean
  error?: string
}

const initialState: BitbucketState = {
  list: [],
  listLoading: false,
  detailLoading: false,
  branches: [],
  branchesLoading: false,
}

export const fetchRepositories = createAsyncThunk<BitbucketRepository[], void, { rejectValue: string }>(
  'bitbucket/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getRepositories()
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to load repositories')
    }
  },
)

export const fetchRepositoryDetail = createAsyncThunk<BitbucketRepository, string | number, { rejectValue: string }>(
  'bitbucket/fetchDetail',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRepository(id)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to load repository')
    }
  },
)

export const fetchRepositoryBranches = createAsyncThunk<Branch[], string | number, { rejectValue: string }>(
  'bitbucket/fetchBranches',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getRepositoryBranches(id)
      return response.data.branches
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to load branches')
    }
  },
)

export const createRepositoryThunk = createAsyncThunk<BitbucketRepository, any, { rejectValue: string }>(
  'bitbucket/create',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await createRepository(payload)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to create repository')
    }
  },
)

export const addRepositoryThunk = createAsyncThunk<BitbucketRepository, any, { rejectValue: string }>(
  'bitbucket/add',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await addRepository(payload)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to add repository')
    }
  },
)

export const updateRepositoryThunk = createAsyncThunk<BitbucketRepository, { id: string | number; payload: any }, { rejectValue: string }>(
  'bitbucket/update',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const response = await updateRepository(id, payload)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to update repository')
    }
  },
)

export const updateRepositoryBranchesThunk = createAsyncThunk<Branch[], { id: string | number; payload: Branch[] }, { rejectValue: string }>(
  'bitbucket/updateBranches',
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      await updateRepositoryBranches(id, payload)
      return payload
    } catch (error: any) {
      return rejectWithValue(error?.message ?? 'Failed to update branches')
    }
  },
)

const bitbucketSlice = createSlice({
  name: 'bitbucket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRepositories.pending, (state) => {
        state.listLoading = true
        state.error = undefined
      })
      .addCase(fetchRepositories.fulfilled, (state, action: PayloadAction<BitbucketRepository[]>) => {
        state.listLoading = false
        state.list = action.payload ?? []
      })
      .addCase(fetchRepositories.rejected, (state, action) => {
        state.listLoading = false
        state.error = (action.payload as string) ?? action.error.message
      })
      .addCase(fetchRepositoryDetail.pending, (state) => {
        state.detailLoading = true
        state.error = undefined
      })
      .addCase(fetchRepositoryDetail.fulfilled, (state, action: PayloadAction<BitbucketRepository>) => {
        state.detailLoading = false
        state.detail = action.payload
      })
      .addCase(fetchRepositoryDetail.rejected, (state, action) => {
        state.detailLoading = false
        state.error = (action.payload as string) ?? action.error.message
      })
      .addCase(fetchRepositoryBranches.pending, (state) => {
        state.branchesLoading = true
      })
      .addCase(fetchRepositoryBranches.fulfilled, (state, action: PayloadAction<Branch[]>) => {
        state.branchesLoading = false
        state.branches = action.payload ?? []
      })
      .addCase(fetchRepositoryBranches.rejected, (state, action) => {
        state.branchesLoading = false
        state.error = (action.payload as string) ?? action.error.message
      })
      .addCase(createRepositoryThunk.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list]
      })
      .addCase(addRepositoryThunk.fulfilled, (state, action) => {
        state.list = [action.payload, ...state.list]
      })
      .addCase(updateRepositoryThunk.fulfilled, (state, action) => {
        state.detail = action.payload
        state.list = state.list.map((repo) => (repo.id === action.payload.id ? action.payload : repo))
      })
      .addCase(updateRepositoryBranchesThunk.fulfilled, (state, action) => {
        state.branches = action.payload ?? []
      })
  },
})

export default bitbucketSlice.reducer
