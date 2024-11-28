import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredential } from '../auth/authSlice'
const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.accessToken
        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    if (result.error?.originalStatus === 403) {
        const refreshResult = baseQuery('/refresh', api, extraOptions)
        if (refreshResult?.data) {
            const email = api.getState().auth.email
            api.dispatch(setCredential({ ...refreshResult.data, email }))
            let result = await baseQuery(args, api, extraOptions)

        }
        else{
            api.dispatch(logOut())
        }
    }
    return result

}
export const apiSlice = createApi({
  baseQuery:baseQueryWithReauth,
  endpoints:builder=>({})
})