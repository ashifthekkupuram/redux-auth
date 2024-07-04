import { apiSlice } from '../../app/api/apiSlice'

export const noteApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotes: builder.mutation({
            query: () => ({
                url: '/note',
                method: 'GET'
            })
        })
    })
})

export const  { useGetNotesMutation } = noteApiSlice