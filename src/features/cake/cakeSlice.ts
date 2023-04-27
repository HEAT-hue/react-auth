// Speaking
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Create state type
interface CakeStateType {
    numOfCakes: number
}

// Create Payload Interface
interface PayloadType {
    qty: number
}

// Create the initial state
const initialState: CakeStateType = {
    numOfCakes: 10
}

// Create Cake Slice
const cakeSlice = createSlice({
    name: "cake",
    initialState,
    reducers: {
        ordered: (state) => {
            state.numOfCakes--;
        },
        restocked: (state, action: PayloadAction<PayloadType>) => {
            const { qty } = action.payload;
            state.numOfCakes = qty;
        }
    }
})

// Export cake slice actions
export const cakeActions = cakeSlice.actions;

// Export cake slice reducer
export const cakeReducer = cakeSlice.reducer;