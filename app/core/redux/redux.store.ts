import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { StateType } from "./redux.model";
import {  dbGetContacts, dbGetMessages,  dbLogin } from "../config/database";
import { Contact } from "../model/contact";

// Init
const INIT_STATE: StateType = {
    me: { id: 0, name: "", type: "aluno" },
    contacts: [],
    msgAll: [],
    msgProfessor: [],
    msgAlunos: []
}

// Stock
const stock = createSlice({
    name: "stock",
    initialState: INIT_STATE,
    reducers: {
        setLogin(state, action: { payload: Contact, type: string }) {
            state.me = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.contacts = action.payload
        }),
            builder.addCase(getLogin.fulfilled, (state, action) => {
                state.me = action.payload
            }),
            builder.addCase(getMessages.fulfilled, (state, action) => {
                state.msgAll = action.payload

                const getContactType = (id: number): "aluno" | "professor" | undefined => {
                    return state.contacts.filter((contact) => { if (contact.id == id) return contact })[0].type
                }

                state.msgAlunos = action.payload.filter((msg) => { if (getContactType(msg.contactId) == "aluno") return msg }) ?? []
                state.msgProfessor = action.payload.filter((msg) => { if (getContactType(msg.contactId) == "professor") return msg }) ?? []
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

export const getMessages = createAsyncThunk(
    "getMessages",
    async (thunkAPI) => {
        let messages = await dbGetMessages()

        return messages
    }
)

// Export
export const { setLogin } = stock.actions
export const stockReducer = stock.reducer
