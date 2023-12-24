import {
    configureStore,
    ThunkAction,
    Action,
    combineReducers,
} from "@reduxjs/toolkit"
import categoriesReducer from "../features/categoriesSlice"
import tasksReducer from "../features/tasksSlice"

const rootReducer = combineReducers({
    categories: categoriesReducer,
    tasks: tasksReducer,
})

const store = configureStore({
    reducer: rootReducer,
})

export default store

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>
