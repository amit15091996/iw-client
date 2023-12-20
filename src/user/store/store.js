import { configureStore } from '@reduxjs/toolkit'
import SideNavExpandSlice from './SideNavExpandSlice'

export const store = configureStore({
  reducer: {
    expandNav:SideNavExpandSlice
  },
})