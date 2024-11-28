import { apiSlice } from "../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints:builder=>({
        login:builder.mutation({
            query:(Credential)=>({
                url:'/api/user/login',
                method:'POST',
                body:{...Credential}
            })
        })
    })
})


export const {useLoginMutation} = authApiSlice