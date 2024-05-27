import { configureStore } from '@reduxjs/toolkit'
import birthsReducer from './features/birthsSlice'

export const makeStore = () => {
  return configureStore({
    reducer: {
      birthsReducer
    }
  })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
