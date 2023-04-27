// Import the RTK Query methods from react-specific endpoint
// Import createAPI for API query - Create API slice per application / per base URL
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Import PostData type
import type { PostData } from '../../data';

// Export appSlice to make reducer and middleware available
export const apiSlice = createApi({

    // State the path the cache reducer will be added to the store
    // To access it - store.api
    reducerPath: "api",


    // Define tags to invalidate appropriate queries after mutation
    tagTypes: ['Post'],

    // All requests will start from this base url
    // base query is used fetch data from server
    // fetch query - wrapped around the fetch to handle processing of requests and responses
    baseQuery: fetchBaseQuery({
        // base url
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),

    // The endpoints represent operations and requests to the server
    endpoints: (builder) => (
        {
            // The getPost is a query operation that returns list of users
            // builder.query<ResultType, QueryArg>
            // Generic specified here is used to type check the auto generated hook when called
            // If no arg is expected, we must explicitly pass void
            getUsers: builder.query<any[], void>({
                query: () => '/users',    // Supply remaining piece of URL path
                providesTags: ['Post']
            }),

            // This queries this server for a single user
            getUserById: builder.query<any, number>({
                query: (userId: number) => `/users/${userId}`
            }),

            // The postData is a query operation that posts data to the server
            // Here an object is returned query endpoint containing the POST request
            addNewData: builder.mutation<PostData, PostData>({
                query: () => ({
                    url: '/posts',
                    method: 'POST',
                    body: (JSON.stringify({ title: 'foo', body: 'bar', userId: 1 }))
                }),
                invalidatesTags: ['Post']
            })
        }
    )

});

// Export auto generated hooks for different endpoints
export const { useGetUsersQuery, useGetUserByIdQuery, useAddNewDataMutation } = apiSlice;