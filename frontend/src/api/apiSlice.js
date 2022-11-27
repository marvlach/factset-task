import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userActions } from '../store/userSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => { 
        const token = getState().user.accessToken
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log('baseQueryWithReauth')
    let result = await baseQuery(args, api, extraOptions)
    if (result?.error?.status !== 401) {
        return result
    }
    console.log('sending refresh token');
    // send refresh token to get new access token 
    const refreshResult = await baseQuery('user/refresh', api, extraOptions);

    if (!refreshResult?.data) {
        api.dispatch(userActions.logout())
    }
    
    // store the new token 
    api.dispatch(userActions.login({ token: refreshResult?.data?.token }))

    // retry the original query with new access token 
    result = await baseQuery(args, api, extraOptions)
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})