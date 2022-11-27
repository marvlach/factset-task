import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userActions } from '../store/userSlice';

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => { 
        const token = getState().user.token
        if (token) {
            headers.set("Authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    console.log('baseQueryWithReauth')
    let result = await baseQuery(args, api, extraOptions)
    console.log('result', result)
    if (result?.error?.status !== 401) {
        console.log('heeereeee', result)
        return result
    }
    console.log('sending refresh token');
    // send refresh token to get new access token 
    const refreshResult = await baseQuery('user/refresh', api, extraOptions);

    console.log(refreshResult)

    if (!refreshResult?.data) {
        api.dispatch(userActions.logout())
    }
   
    // const user = api.getState().user.user

    // store the new token 
    api.dispatch(userActions.login({ token: refreshResult.data.token }))

    // retry the original query with new access token 
    result = await baseQuery(args, api, extraOptions)
    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})