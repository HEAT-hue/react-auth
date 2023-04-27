import { configureStore } from "@reduxjs/toolkit";
import { cakeReducer, userReducer, icecreamReducer } from "../features";
import { apiSlice } from "../features/api";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

const store = configureStore({
    reducer: {
        cake: cakeReducer,
        user: userReducer,
        icecream: icecreamReducer,
        // Add cache reducer to the store
        [apiSlice.reducerPath]: apiSlice.reducer
    },

    // Add apiSlice middleware to take care of caching and expiration time of requests
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware)
});

// To allow us to set the refetchOnFocus or refetchOnReconnect flags to true when application gains focus
// Or Network is reestablisheds
setupListeners(store.dispatch);

export { store };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
