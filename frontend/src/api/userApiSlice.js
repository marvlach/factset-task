import { apiSlice } from "./apiSlice.js";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: body => ({
                url: '/user/login',
                method: 'POST',
                body: { ...body }
            })
        }),
        signup: builder.mutation({
            query: body => ({
                url: '/user/signup',
                method: 'POST',
                body: { ...body }
            })
        }),
        getUser: builder.query({
            query: () => ({
                url: '/user',
                method: 'GET',
            })
        }),
    })
})

export const { useLoginMutation, useSignupMutation, useGetUserQuery } = userApiSlice