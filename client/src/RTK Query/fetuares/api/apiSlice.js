import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: ['TODOS'],
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3500' }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/blogs',
            transformResponse:res=>res.sort((a,b)=>a.id - b.id),
            providesTags: ['TODOS']
        }),
        addTodos: builder.mutation({
            query: (todos) => ({
                url: '/blogs',
                method: 'POST',
                body: todos
            }),
            invalidatesTags: ['TODOS']
        }),
        updateTodos: builder.mutation({
            query: (todos) => ({
                url: `/blogs/${todos.id}`,
                method: 'PATCH',
                body: todos
            }),
            invalidatesTags: ['TODOS'],


        }),
        deleteTodos: builder.mutation({
            query: ({id}) => ({
                url: `/blogs/${id}`,
                method: 'DELETE',
                body: id
            }),
            invalidatesTags: ['TODOS']

        })


    })

})



export const {
    useGetTodosQuery,
    useAddTodosMutation,
    useUpdateTodosMutation,
    useDeleteTodosMutation

} = apiSlice


export default apiSlice