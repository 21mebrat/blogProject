import React from 'react'
import useAuth from './useAuth'
import { api } from '../api/Axios'

const useLogout = () => {
    const {setAuth} = useAuth()
    const logout=async()=>{
        setAuth({})
        try{
        await api.get('/user/logout',{withCredentials:true})

        }catch(err){
            console.log(err)
        } 


    }
  return  logout
}

export default useLogout
