import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { cakeActions } from "../cake";

// Define interface for state
interface IcecreamStateType {
    numOfIcecreams: number
}

// Define the Payload action type
interface PayloadActionType {
    qty: number
}

// Create the initial state
const initialState: IcecreamStateType = {
    numOfIcecreams: 20
}

// Create the ice cream slice
const icecreamSlice = createSlice({
    name: "icecream",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfIcecreams--;
        },
        restocked: (state, action: PayloadAction<PayloadActionType>) => {
            const { qty } = action.payload;
            state.numOfIcecreams = qty;
        }
    },
    // Extra reducers are used to respond to action types not specified in it's slice | They respond to external actions
    extraReducers: (builder) => {
        builder.addCase(cakeActions.ordered, (state) => {
            state.numOfIcecreams--;
        })
    }
})

// Export icecream slice actions
export const icecreamActions = icecreamSlice.actions;

// Export icecream reducer
export const icecreamReducer = icecreamSlice.reducer;