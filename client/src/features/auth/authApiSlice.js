import { apiSlice } from '../../app/api/apiSlice';
import { logOut, setCredentials } from './authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: credentials => ({
                url: '/auth/register',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }){
                try{
                    await queryFulfilled
                    dispatch(logOut())
                    dispatch(apiSlice.util.resetApiState())
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET'
            }),
            async onQueryStarted(args, {dispatch, queryFulfilled}){
                try{
                    const { data } = await queryFulfilled
                    dispatch(setCredentials({accessToken: data.accessToken, user: data.user}))
                } catch (err) {
                    console.log(err)
                }
            }
        })
    })
})

export const { useLoginMutation, useRegisterMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice