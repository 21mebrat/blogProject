import React, { useEffect, useState } from 'react'
import useAuth from './useAuth'
import usePrivateAxios from './usePrivateAxios'

const useUsers = () => {
    const { auth,setUser } = useAuth()
    const privateAxios = usePrivateAxios()
    const fetchUsers = async () => {
        try {
            const response = await privateAxios.get('/user/getAll')
            setUser(response.data.allUsers)
           return response.data.allUsers
        } catch (error) {
            console.log(error)
        }

    }


    return fetchUsers
}

export default useUsers
