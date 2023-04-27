import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define the interface for user state
interface UserStateType {
    loading: boolean
    users: []
    error: string | undefined
}

// Create the initial state of the slice
const initialState: UserStateType = {
    loading: false,
    users: [],
    error: ""
}

// Create the Async thunk to execute async operations
// Invoke Async thunk function
// The async thunk generates three Redux action creators that return action types of pending, fulfilled, rejected
// returns a thunk action payload creator executed by thunk middleware automatically dispatch lifecyclye actions based on the returned promise
// type prefix is for the action type joined together with the promise status - user/fetchUser/pending | user/fetchUser/fulfilled
export const getUsers = createAsyncThunk("user/fetchUser", () => {
    return axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.data);
})

// Create the slice
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.pending, (state) => {
            state.loading = true
            state.users = []
            state.error = ""
        }),
            builder.addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false,
                    state.users = action.payload
                state.error = ""
            }),
            builder.addCase(getUsers.rejected, (state, action) => {
                state.loading = false
                state.users = []
                state.error = action.error.message
            })
    }
})

// Export User Reducer
export const userReducer = userSlice.reducer;