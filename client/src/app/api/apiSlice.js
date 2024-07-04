import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { setCredentials,logOut } from '../../features/auth/authSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api/',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if(token){
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth =  async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if(result?.error?.originalStatus === 403){
        console.log('Sending refresh token')
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)
        console.log(refreshResult)
        if(refreshResult?.data){
            api.dispatch(setCredentials({token: refreshResult.data.accessToken, user: refreshResult.data.user}))
            result = await baseQuery(args, api, extraOptions)
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})