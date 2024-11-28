import { configureStore } from '@reduxjs/toolkit'
import postReducer from './slice'
import myReducer from './userSlice'
export const store = configureStore({
    reducer: {
        posts: postReducer,
        user:myReducer
    }
})