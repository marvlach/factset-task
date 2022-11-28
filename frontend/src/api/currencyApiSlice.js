import { apiSlice } from "./apiSlice.js";

export const currencyApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getCurrencies: builder.query({
            query: () => ({
                url: '/currency',
                method: 'GET',
            }),
            providesTags: ['Currency'],
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
            }),
            providesTags: ['Exchange'],
        }),
        addCurrency: builder.mutation({
            query: body => ({
                url: '/currency',
                method: 'POST',
                body: { ...body }
            }),
            invalidatesTags: ['Currency'],
        }),
        addExchange: builder.mutation({
            query: body => ({
                url: '/exchange',
                method: 'POST',
                body: { ...body }
            }),
            invalidatesTags: ['Exchange'],
        })
        /*
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
    useLazyGetExchangeQuery,
    useAddCurrencyMutation,
    useAddExchangeMutation
} = currencyApiSlice