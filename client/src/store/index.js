import { configureStore } from '@reduxjs/toolkit'

import systemReducer from './system'

export const store = configureStore({
  reducer: {
    system: systemReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredPaths: ['system.contract', 'system.transfer'],
        ignoredActions: ['system/setContract','system/setTransfer'],
      },
    }),
})

