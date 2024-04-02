import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./redux.model";
import { dbGetContacts, dbLogin } from "../config/database";

// Init
const INIT_STATE: StateType = {
    me: { id: 0, name: "", type: "aluno" },
    contacts: [],
    messages: []
}

// Stock
const stock = createSlice({
    name: "stock",
    initialState: INIT_STATE,
    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.contacts = action.payload
        }),
        builder.addCase(getLogin.fulfilled, (state, action) => {
            state.me = action.payload
        })
    }
})

export const getContacts = createAsyncThunk(
    "getContacts",
    async (thunkAPI) => {
        let contacts = await dbGetContacts()

        return contacts
    }
)

export const getLogin = createAsyncThunk(
    "getLogin",
    async ({ name, password }: { name: string, password: string }) => {
        let contact = await dbLogin(name, password)

        return contact
    }
)

// Export
export const { } = stock.actions
export const stockReducer = stock.reducer
