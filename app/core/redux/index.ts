import { configureStore } from "@reduxjs/toolkit"
import { stockReducer } from "./redux.store"

const store = configureStore({
    reducer: {
        stock: stockReducer
    }
})

export type storeStateType = ReturnType<typeof store.getState>

export default store