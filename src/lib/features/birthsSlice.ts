import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

type InitialState = {
  value: BirthsState
}

export type Births = {
  text: string,
  year: string
}

type BirthsState = {
  births: Births[]
  status: string | undefined
  error: string | undefined
}

type BirthReducer = {
  birthsReducer: InitialState
}

interface SerializedError {
  name?: string
  message?: string
  stack?: string
  code?: string
}

const initialState = {
  value: {
    births: [],
    status: undefined,
    error: undefined
  } as BirthsState
} as InitialState

export enum BithdatesFetchStatus {
  Loading = 'loading',
  Success = 'success',
  Failed = 'failed'
}

const today = new Date()
export const month = String(today.getMonth() + 1).padStart(2, '0')
export const day = String(today.getDate()).padStart(2, '0')
const url = `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/${month}/${day}`

const errorHandler = (response: Response) => {
  switch (response.status) {
    case 404:
      throw new Error('Page not found')
    case 500:
      throw new Error('Sorry, server encountered an unexpected problem')
    default:
      throw new Error(response.statusText)
  }
}

export const fetchBirths = createAsyncThunk('birthdates/fetchBirthdates', async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(url)

      if (response.ok) {
        const data = await response.json()

        return data
      }

      errorHandler(response)
    }
    catch (error) {
      return rejectWithValue(error)
    }
  }
)

export const births = createSlice({
  name: 'births',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchBirths.pending, (state, _) => {
      state.value.status = BithdatesFetchStatus.Loading
    })
    builder.addCase(fetchBirths.fulfilled, (state, action) => {
      state.value.births = action.payload === undefined ? [] : action.payload.births
      state.value.status = BithdatesFetchStatus.Success
    })
    builder.addCase(fetchBirths.rejected, (state, action) => {
      if (action.payload) {
        const payload = action.payload as SerializedError
        state.value.error = payload.message
      } else {
        state.value.error = action.error.message
      }
      state.value.status = BithdatesFetchStatus.Failed
    })
  }
})

export const getBirthsList = (state: BirthReducer) => state.birthsReducer.value.births
export const getBirthsListState = (state: BirthReducer) => state.birthsReducer.value.status
export const getBirthsListError = (state: BirthReducer) => state.birthsReducer.value.error

export default births.reducer
