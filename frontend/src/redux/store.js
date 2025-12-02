import {configureStore} from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userSlice from './userSlice'
import courseSlice from './courseSlice'
import lectureSlice from './lectureSlice'
import reviewSlice from './reviewSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'], // Only persist user state
  debug: true, // Enable debug logging
  serialize: true,
  deserialize: true
}

const persistedUserReducer = persistReducer(persistConfig, userSlice)

export const store=configureStore({
    reducer:{
        user: persistedUserReducer,
        course: courseSlice,
        lecture: lectureSlice,
        review:reviewSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor = persistStore(store)
export default store