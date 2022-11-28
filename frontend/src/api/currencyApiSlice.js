import { apiSlice } from "./apiSlice.js";

export const currencyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrencies: builder.query({
            query: () => ({
                url: '/currency',
                method: 'GET',
            })
        }),
        getExchange: builder.query({
            query: ({ fromId, toId, latest }) => ({
                url: '/exchange',
                method: 'GET',
                params: {
                    from: fromId,
                    to: toId,
                    latest: latest
                }
            })
        }),
        /* signup: builder.mutation({
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
        logout: builder.mutation({
            query: () => ({
                url: '/user/logout',
                method: 'POST',
            })
        }), */
    })
})

export const { 
    useGetCurrenciesQuery, 
    useLazyGetCurrenciesQuery, 
    useGetExchangeQuery, 
    useLazyGetExchangeQuery 
} = currencyApiSlice