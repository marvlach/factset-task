import { apiSlice } from "./apiSlice.js";

export const currencyApiSlice = apiSlice.injectEndpoints({
    tagTypes: ['Currency', 'Exchange'],
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
        deleteCurrency: builder.mutation({
            query: (id) => ({
                url: `/currency/${id}`,
                method: 'DELETE',
                body:{}
            }),
            invalidatesTags: ['Currency', 'Exchange'],
        }),
        addExchange: builder.mutation({
            query: body => ({
                url: '/exchange',
                method: 'POST',
                body: { ...body }
            }),
            invalidatesTags: ['Exchange'],
        })
    })
})

export const { 
    useGetCurrenciesQuery, 
    useLazyGetCurrenciesQuery, 
    useGetExchangeQuery, 
    useLazyGetExchangeQuery,
    useAddCurrencyMutation,
    useAddExchangeMutation,
    useDeleteCurrencyMutation
} = currencyApiSlice